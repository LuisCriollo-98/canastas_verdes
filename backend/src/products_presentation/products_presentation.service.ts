import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsPresentationDto } from './dto/create-products_presentation.dto';
import { UpdateProductsPresentationDto } from './dto/update-products_presentation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsPresentation } from './entities/products_presentation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsPresentationService {

  constructor(
    @InjectRepository(ProductsPresentation) private readonly productsPresentationRepository: Repository<ProductsPresentation>,

  ) { }

  async create(createProductsPresentationDto: CreateProductsPresentationDto) {
    await this.productsPresentationRepository.save(createProductsPresentationDto);
    return { message: 'Presentación de producto creada correctamente' };
  }

  findAll() {

    return this.productsPresentationRepository.find();
  }

  async findOne(id: number) {
    const presentation = await this.productsPresentationRepository.findOneBy({ id });
    if (!presentation) {
      throw new NotFoundException(`Presentación de producto con id ${id} no encontrada`);
    }
    return presentation;
  }

  async update(id: number, updateProductsPresentationDto: UpdateProductsPresentationDto) {
    const presentation = await this.findOne(id);
    presentation.description = updateProductsPresentationDto.description;
    await this.productsPresentationRepository.save(presentation);
    return { message: 'Presentación de producto actualizada correctamente' };
  }

  async remove(id: number) {
    const presentation = await this.findOne(id);
    await this.productsPresentationRepository.remove(presentation);
    return { message: 'Presentación de producto eliminada correctamente' };
  }
}
