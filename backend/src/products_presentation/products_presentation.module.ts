import { Module } from '@nestjs/common';
import { ProductsPresentationService } from './products_presentation.service';
import { ProductsPresentationController } from './products_presentation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsPresentation } from './entities/products_presentation.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsPresentation]), AuthModule],
  controllers: [ProductsPresentationController],
  providers: [ProductsPresentationService],
})
export class ProductsPresentationModule { }
