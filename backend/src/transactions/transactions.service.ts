import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionContents } from './entities/transaction.entity';
import { Between, FindManyOptions, Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(TransactionContents)
    private readonly transactionContentsRepository: Repository<TransactionContents>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createTransactionDto: CreateTransactionDto, userId: number) {
    await this.productRepository.manager.transaction(async (manager) => {
      //Buscar y asociar usuario
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      //Crear transaccion
      const transaction = new Transaction();
      transaction.user = user; //asociar usuario
      transaction.total = createTransactionDto.contents.reduce(
        (total, item) => total + (item.quantity * item.price), 0
      );

      await manager.save(transaction); //guardar transaccion

      for (const contents of createTransactionDto.contents) {
        const product = await manager.findOneBy(Product, { id: contents.productId });
        const errors: string[] = [];

        if (!product) {
          errors.push(`El producto con id: ${contents.productId} no encontrado`);
          throw new NotFoundException(errors);
        }

        if (contents.quantity > product.inventory) {
          errors.push(`El artículo ${product.name} no tiene suficiente stock`);
          throw new BadRequestException(errors);
        }

        product.inventory -= contents.quantity;
        await manager.save(product);

        const transactionContent = new TransactionContents();
        transactionContent.price = contents.price;
        transactionContent.product = product;
        transactionContent.quantity = contents.quantity;
        transactionContent.transaction = transaction;

        await manager.save(transactionContent);
      }
    });

    return { message: "Pedido almacenado correctamente" };
  }

  async findAll(dateFrom?: string, dateTo?: string, page: number = 1, limit: number = 20) {
    const options: FindManyOptions<Transaction> = {
      relations: {
        contents: true,
        user: true,
      },
      order: { transactionsDate: 'DESC' },
      take: limit,
      skip: (page - 1) * limit,
    };

    if (dateFrom || dateTo) {
      const from = dateFrom ? parseISO(dateFrom) : new Date(0);
      const to = dateTo ? parseISO(dateTo) : new Date();

      if ((dateFrom && !isValid(from)) || (dateTo && !isValid(to))) {
        throw new BadRequestException('Fecha no válida');
      }

      options.where = {
        transactionsDate: Between(startOfDay(from), endOfDay(to)),
      };
    }

    const [transactions, total] = await this.transactionRepository.findAndCount(options);
    return { transactions, total };
  }

  async findOne(id: number, userId?: number) {

    const where: any = { id };
    if (userId) {
      where.user = { id: userId };
    }

    const transaction = await this.transactionRepository.findOne({
      where,
      relations: { contents: true }
    });

    if (!transaction) {
      throw new NotFoundException('La transacción no fue encontrada');
    }

    return transaction;
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOneBy({ id });
    if (!transaction) throw new NotFoundException('La transacción no fue encontrada');
    transaction.status = updateTransactionDto.status;
    await this.transactionRepository.save(transaction);
    return { message: 'Estado actualizado correctamente' };
  }

  async remove(id: number) {
    const transaction = await this.findOne(id);

    for (const contents of transaction.contents) {
      const product = await this.productRepository.findOneBy({ id: contents.product.id });

      if (!product) {
        throw new NotFoundException(`El producto con id: ${contents.product.id} no encontrado`);
      }

      product.inventory += contents.quantity;
      await this.productRepository.save(product);

      const transactionContents = await this.transactionContentsRepository.findOneBy({ id: contents.id });
      if (transactionContents) {
        await this.transactionContentsRepository.remove(transactionContents);
      }
    }

    await this.transactionRepository.remove(transaction);
    return { message: 'Venta eliminada correctamente' };
  }
}