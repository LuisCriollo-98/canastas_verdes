import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Farm } from 'src/farms/entities/farm.entity';
import { ProductsPresentation } from 'src/products_presentation/entities/products_presentation.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category, Farm, ProductsPresentation])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
