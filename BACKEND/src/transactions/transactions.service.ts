import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents) private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    await this.productRepository.manager.transaction(async (transactionEntityManager) => {
      const transaction = new Transaction()
      //Calcular el total de la transaccion
      transaction.total = createTransactionDto.contents.reduce((total, item) => total + (item.quantity * item.price), 0)

      for (const contents of createTransactionDto.contents) {
        const product = await transactionEntityManager.findOneBy(Product, { id: contents.productId })
        //Validacion de producto
        const errrors: string[] = []
        if (!product) {
          errrors.push(`El producto con id: ${contents.productId} no encontrado`)
          throw new NotFoundException(errrors)
        }
        //Validacion de inventario
        if (contents.quantity > product.inventory) {
          errrors.push(`El articulo ${product.name} no tiene suficiente stock`)
          throw new BadRequestException(errrors)
        }
        // Restar del inventario
        product.inventory -= contents.quantity

        //Crear instanacio de contents
        const transactionContent = new TransactionContents()
        transactionContent.price = contents.price
        transactionContent.product = product
        transactionContent.quantity = contents.quantity
        transactionContent.transaction = transaction


        await transactionEntityManager.save(transaction)
        await transactionEntityManager.save(transactionContent)
      }
    })

    return "Pedido almacenado correctamente";
  }

  findAll(transactionDate?: string) {
    //Traer todas las transacciones con sus contenidos y los productos de los contenidos
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true
      }
    }
    //Filtro por fecha de transaccion
    if (transactionDate) {
      //Convertir la fecha de transaccion de string Date
      const date = parseISO(transactionDate)
      //Validar que la fecha sea valida
      if (!isValid(date)) {
        throw new BadRequestException('Fecha no valida')
      }
      //Crear el rango de fechas
      const start = startOfDay(date)
      const end = endOfDay(date)
      options.where = {
        transactionsDate: Between(start, end)
      }
    }
    return this.transactionRepository.find(options);
  }

  //Traer una transaccion por id con sus contenidos y los productos de los contenidos
  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
      relations: {
        contents: true
      }
    })
    //Validacion de transaccion
    if (!transaction) {
      throw new NotFoundException(`La transaccion no fue encontrada`)
    }
    return transaction;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }
  //Eliminar transaccion
  async remove(id: number) {
    const transaction = await this.findOne(id)
    //Eliminar los contenidos de la transaccion
    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({ id: contents.product.id })
      //Validacion de producto
      if (!product) {
        throw new NotFoundException(`El producto con id: ${contents.product.id} no encontrado`)
      }
      //regresar al inventario la cantidad vendida si la venta es cancelada
      product.inventory += contents.quantity
      await this.productRepository.save(product)

      const transactionContents = await this.transactionContentsRepository.findOneBy({ id: contents.id })
      // validacion si existe el contenido
      if (transactionContents) {
        await this.transactionContentsRepository.remove(transactionContents)
      }
    }
    await this.transactionRepository.remove(transaction)
    return { message: 'Venta eliminada correctamente' };
  }
}
