import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MunicipalitiesModule } from './municipalities/municipalities.module';
import { ProductsPresentationModule } from './products_presentation/products_presentation.module';
import { FarmsModule } from './farms/farms.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ //  cargar variables de entorno en modo global
      isGlobal: true //el modulo esta disponible en toda la app sin necesidad de importarlo en cada modulo
    }),
    TypeOrmModule.forRootAsync({ //permite la configuracion dinamica con inyeccion de dependencias
      useFactory: typeOrmConfig, // funcion que crea y retorna la configuración de TypeORM
      inject: [ConfigService] // arreglo de depencias que se pasarán a userFactory

    }),
    CategoriesModule,
    ProductsModule,
    TransactionsModule,
    MunicipalitiesModule,
    ProductsPresentationModule,
    FarmsModule,
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
