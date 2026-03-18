import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { ProductsPresentation } from 'src/products_presentation/entities/products_presentation.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Farm) private readonly farmRepository: Repository<Farm>,
    @InjectRepository(ProductsPresentation) private readonly presentationRepository: Repository<ProductsPresentation>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOneBy({ id: createProductDto.categoryId })
    //si la categoria no existe
    if (!category) {
      let errors: string[] = []
      errors.push('La categoria no existe')
      throw new NotFoundException(errors)
    }
    // Sin la finca no existe
    const farm = await this.farmRepository.findOneBy({ id: createProductDto.farmId })
    if (!farm) {
      let errors: string[] = []
      errors.push('La finca no existe')
      throw new NotFoundException(errors)
    }
    //Si la presentación no existe
    const presentation = await this.presentationRepository.findOneBy({ id: createProductDto.presentationId })
    if (!presentation) {
      let errors: string[] = []
      errors.push('La presentación no existe')
      throw new NotFoundException(errors)
    }
    //Guardar el producto
    return this.productRepository.save({
      ...createProductDto,
      category,
      farm,
      presentation
    })

  }
  //filtrar prodcutos por categoria con la URL
  async findAll(categoryId: number | null, take: number, skip: number) {
    // 1. Definimos la configuración base de la consulta (TypeORM FindManyOptions)
    const options: FindManyOptions<Product> = {
      // 'relations' actúa como un SQL JOIN para traer los datos de la categoría asociada
      relations: {
        category: true,
        farm: true,
        presentation: true
      },
      // Ordenamos los resultados: los productos más nuevos (ID más alto) aparecen primero
      order: {
        id: 'DESC'
      },
      //Paginación 
      take, //Muestra el ultimo producto
      skip //Permite saltar algunos resultados en la paginación
    }

    // 2. Filtro dinámico: Si recibimos un ID de categoría, modificamos el objeto 'options'
    if (categoryId) {
      options.where = {
        category: {
          id: categoryId // Filtra productos que pertenezcan exactamente a este ID de categoría
        }
      }
    }

    // 3. Ejecución de la consulta en la DB:
    // 'findAndCount' devuelve un arreglo con dos posiciones:
    // [0]: Los registros encontrados (products)
    // [1]: La cantidad total de registros ignorando límites (total)
    const [products, total] = await this.productRepository.findAndCount(options)

    // 4. Retornamos un objeto estructurado, ideal para paginación o interfaces de frontend
    return {
      products,
      total
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
      //Relacionar categoria al momento de filtrar el producto por ID, pero si son bastantes datos es mejor no relacionar
      relations: { category: true, farm: true, presentation: true }
    })
    if (!product) {
      throw new NotFoundException(`El producto con el ID: ${id} no fue encontrado`)
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    Object.assign(product, updateProductDto)

    //Actualizar la categoria
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: updateProductDto.categoryId })
      //si la categoria no existe
      if (!category) {
        let errors: string[] = []
        errors.push('La categoria no existe')
        throw new NotFoundException(errors)
      }
      product.category = category
    }

    if (updateProductDto.farmId) {
      const farm = await this.farmRepository.findOneBy({ id: updateProductDto.farmId })
      if (!farm) {
        throw new NotFoundException(['La finca no existe'])
      }
      product.farm = farm
    }

    if (updateProductDto.presentationId) {
      const presentation = await this.presentationRepository.findOneBy({ id: updateProductDto.presentationId })
      if (!presentation) {
        throw new NotFoundException(['La presentación no existe'])
      }
      product.presentation = presentation
    }
    return await this.productRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
    return "Producto eliminado";
  }
}
