import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from "typeorm";
import { Category } from "../categories/entities/category.entity";
import { Product } from "../products/entities/product.entity";
import { Municipality } from "../municipalities/entities/municipality.entity";
import { ProductsPresentation } from "../products_presentation/entities/products_presentation.entity";
import { categories } from "./data/categories";
import { municipalities } from "./data/municipalities";
import { presentations } from "./data/presentations";
import { products } from "./data/products";
import * as bcrypt from 'bcrypt';
import { User, UserRole } from "../users/entities/user.entity";
import { users } from "./data/user";

@Injectable()
export class SeederService {

  private readonly PORCENTAJE = 0.05;

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Municipality)
    private readonly municipalityRepository: Repository<Municipality>,
    @InjectRepository(ProductsPresentation)
    private readonly productsPresentationRepository: Repository<ProductsPresentation>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly dataSource: DataSource,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async onModuleInit() {
    await this.dataSource.dropDatabase();
    await this.dataSource.synchronize();
  }

  private async generateCode(municipalityName: string, categoryName: string): Promise<string> {
    const prefix = `${municipalityName.charAt(0).toUpperCase()}${categoryName.charAt(0).toUpperCase()}`;

    const lastProduct = await this.productRepository
      .createQueryBuilder('product')
      .where('product.code LIKE :prefix', { prefix: `${prefix}%` })
      .orderBy('product.code', 'DESC')
      .getOne();

    const consecutive = lastProduct ? parseInt(lastProduct.code.slice(2)) + 1 : 1;
    return `${prefix}${consecutive.toString().padStart(4, '0')}`;
  }

  async seed() {
    // Crear usuario administrador
    for(const seedUser of users) {
      const user = new User()
      user.name = seedUser.name;
      user.email = seedUser.email;
      user.phone = seedUser.phone;
      user.address = seedUser.address;
      user.role = seedUser.role;
      user.password = await bcrypt.hash('admin123', 10);
      await this.userRepository.save(user);
    }

    // Crear categorías
    await this.categoryRepository.save(categories);

    // Crear municipios
    await this.municipalityRepository.save(municipalities);

    // Crear presentaciones
    await this.productsPresentationRepository.save(presentations);

    for (const seedProduct of products) {  
      const category = await this.categoryRepository.findOneBy({ name: seedProduct.category });
      const municipality = await this.municipalityRepository.findOneBy({ name: seedProduct.municipality });
      const presentation = await this.productsPresentationRepository.findOneBy({ description: seedProduct.description });

      if (!category) { console.warn(`Categoría no encontrada: ${seedProduct.category}`); continue; }
      if (!municipality) { console.warn(`Municipio no encontrado: ${seedProduct.municipality}`); continue; }
      if (!presentation) { console.warn(`Presentación no encontrada: ${seedProduct.description}`); continue; }


      const code = await this.generateCode(municipality.name, category.name);


      const logisticsCost = Math.round(seedProduct.price * this.PORCENTAJE);
      const transportCost = Math.round(seedProduct.price * this.PORCENTAJE);
      const priceSuggested = Math.round(seedProduct.price + logisticsCost + transportCost);

      const product = new Product();
      product.code = code;
      product.name = seedProduct.name;
      product.image = seedProduct.image;
      product.price = seedProduct.price;
      product.costLogistics = logisticsCost;
      product.costTransport = transportCost;
      product.priceSuggested = priceSuggested;
      product.priceFinal = priceSuggested;
      product.inventory = 10; //se envia 10 por defecto ya que no se tiene el datos de los productos
      product.farm = null;
      product.category = category;
      product.municipality = municipality;
      product.presentation = presentation;

      await this.productRepository.save(product);
    }

    console.log('Seed completado');
  }
}