import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipalitiesService } from './municipalities.service';
import { MunicipalitiesController } from './municipalities.controller';
import { Municipality } from './entities/municipality.entity';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [TypeOrmModule.forFeature([Municipality]), AuthModule],
  controllers: [MunicipalitiesController],
  providers: [MunicipalitiesService],
})
export class MunicipalitiesModule { }
