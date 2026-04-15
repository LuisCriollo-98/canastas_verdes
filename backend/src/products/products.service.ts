import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { Farm } from '../farms/entities/farm.entity';
import { ProductsPresentation } from '../products_presentation/entities/products_presentation.entity';
import { GetProductsQueryDto } from './dto/get-product.dto';
import { Municipality } from '../municipalities/entities/municipality.entity';

@Injectable()
export class ProductsService {
  //Porcentaje para calcular costos de logistica y transporte
  private readonly PORCENTAJE = 0.05; // 5%

  constructor(
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Farm) private readonly farmRepository: Repository<Farm>,
    @InjectRepository(ProductsPresentation) private readonly presentationRepository: Repository<ProductsPresentation>,
    @InjectRepository(Municipality) private readonly municipalityRepository: Repository<Municipality>
  ) { }

  // Método reutilizable para calcular precios
  private calcPrice(price: number) {
    const startPrice = Number(price);
    const logisticsCost = Math.round(startPrice * this.PORCENTAJE);
    const transportCost = Math.round(startPrice * this.PORCENTAJE);
    const priceSuggested = Math.round(startPrice + logisticsCost + transportCost);

    return { logisticsCost, transportCost, priceSuggested };
  }

  //Previsualizar precios
  async previewPrices(price: number) {
    return {
      price: Number(price),
      ...this.calcPrice(price)
    };
  }
  // Generar código automático basado en municipio y categoría
  private async generateCode(
    municipalityName: string,
    categoryName: string,
  ): Promise<string> {
    const municipalityLetter = municipalityName.charAt(0).toUpperCase();
    const categoryLetter = categoryName.charAt(0).toUpperCase();
    const prefix = `${municipalityLetter}${categoryLetter}`;

    // Buscar último producto con ese prefijo
    const lastProduct = await this.productRepository
      .createQueryBuilder('product')
      .where('product.code LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('product.code', 'DESC')
      .getOne();

    // Calcular consecutivo
    let consecutive = 1;
    if (lastProduct) {
      const lastNumber = parseInt(lastProduct.code.slice(2));
      consecutive = lastNumber + 1;
    }

    return `${prefix}${consecutive.toString().padStart(4, '0')}`;
  }


  //Crear producto
  async create(createProductDto: CreateProductDto) {
    // Consultas en paralelo
    const [category, presentation, municipality] = await Promise.all([
      this.categoryRepository.findOneBy({ id: createProductDto.categoryId }),
      this.presentationRepository.findOneBy({ id: createProductDto.presentationId }),
      this.municipalityRepository.findOneBy({ id: createProductDto.municipalityId }),
    ]);

    if (!category) throw new NotFoundException(['La categoría no existe']);
    if (!municipality) throw new NotFoundException(['El municipio no existe']);
    if (!presentation) throw new NotFoundException(['La presentación no existe']);

    let farm: Farm | null = null;
    if (createProductDto.farmId) {
      farm = await this.farmRepository.findOne({
        where: { id: createProductDto.farmId },
        relations: { municipality: true },
      });
      if (!farm) throw new NotFoundException(['La finca no existe']);
    }

    // Generar código
    const code = await this.generateCode(municipality.name, category.name);

    // Calcular precios automáticamente
    const { logisticsCost, transportCost, priceSuggested } =
      this.calcPrice(createProductDto.price);

    const product = this.productRepository.create({
      ...createProductDto,
      code,
      category,
      municipality,
      farm,
      presentation,
      costLogistics: logisticsCost,
      costTransport: transportCost,
      priceSuggested,
      priceFinal: createProductDto.priceFinal ?? priceSuggested,
    });

    return this.productRepository.save(product);
  }

  // Obtener todos los productos con filtros y paginación
  async findAll(query: GetProductsQueryDto) {
    const take = query.take ? Number(query.take) : 10;
    const skip = query.skip ? Number(query.skip) : 0;
    //Configuración de la consulta
    const options: FindManyOptions<Product> = {
      relations: { category: true, farm: true, presentation: true },
      order: { id: 'DESC' },
      take,
      skip,
    };
    //Filtrar productos por categoria
    if (query.category_id) {
      options.where = {
        category: { id: Number(query.category_id) },
      };
    }
    //Obtener todos los productos
    const [products, total] = await this.productRepository.findAndCount(options);

    return { products, total };
  }

  //filtrar prodcuto por ID
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
  //actualizar prodcuto
  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id)
    Object.assign(product, updateProductDto)
    //Actualizar el precio
    if (updateProductDto.price) {
      const { logisticsCost, transportCost, priceSuggested } = this.calcPrice(updateProductDto.price)
      product.costLogistics = logisticsCost
      product.costTransport = transportCost
      product.priceSuggested = priceSuggested
    }
    //Actualizar la categoria
    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: updateProductDto.categoryId })
      if (!category) {
        let errors: string[] = []
        errors.push('La categoria no existe')
        throw new NotFoundException(errors)
      }
      product.category = category
    }
    //Actualizar el municipio
    if (updateProductDto.municipalityId) {
      const municipality = await this.municipalityRepository.findOneBy({ id: updateProductDto.municipalityId })
      if (!municipality) {
        throw new NotFoundException(['El municipio no existe'])
      }
      product.municipality = municipality
    }
    //Actualizar la finca
    if (updateProductDto.farmId) {
      const farm = await this.farmRepository.findOne({
        where: { id: updateProductDto.farmId },
        relations: { municipality: true },
      })
      if (!farm) {
        throw new NotFoundException(['La finca no existe'])
      }
      product.farm = farm
    }
    //Actualizar la presentacion
    if (updateProductDto.presentationId) {
      const presentation = await this.presentationRepository.findOneBy({ id: updateProductDto.presentationId })
      if (!presentation) {
        throw new NotFoundException(['La presentación no existe'])
      }
      product.presentation = presentation
    }
    return await this.productRepository.save(product)
  }
  //eliminar prodcuto
  async remove(id: number) {
    const product = await this.findOne(id)
    await this.productRepository.remove(product)
    return { message: 'Producto eliminado correctamente' }
  }
}
