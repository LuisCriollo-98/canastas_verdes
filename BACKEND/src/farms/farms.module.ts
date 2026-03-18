import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { Municipality } from '../municipalities/entities/municipality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, Municipality])],
  controllers: [FarmsController],
  providers: [FarmsService],
})
export class FarmsModule {}
