import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Farm } from '../farms/entities/farm.entity';
import { ProductsPresentation } from '../products_presentation/entities/products_presentation.entity';
import { AuthModule } from '../auth/auth.module';
import { Municipality } from '../municipalities/entities/municipality.entity';
@Module({
  imports: [TypeOrmModule.forFeature([
    Product, Category, Farm, ProductsPresentation, Municipality]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
