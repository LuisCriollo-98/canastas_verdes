import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config'
import { Category } from '../categories/entities/category.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { ProductsPresentation } from '../products_presentation/entities/products_presentation.entity';
import { Product } from '../products/entities/product.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRootAsync({
            useFactory: typeOrmConfig,
            inject: [ConfigService]

        }),
        TypeOrmModule.forFeature([Product,Category, Municipality, ProductsPresentation])
    ],
    providers: [SeederService],
})
export class SeederModule { }
