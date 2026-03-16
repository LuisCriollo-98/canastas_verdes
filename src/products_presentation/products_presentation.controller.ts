import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsPresentationService } from './products_presentation.service';
import { CreateProductsPresentationDto } from './dto/create-products_presentation.dto';
import { UpdateProductsPresentationDto } from './dto/update-products_presentation.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('products-presentation')
export class ProductsPresentationController {
  constructor(
    private readonly productsPresentationService: ProductsPresentationService
  ) { }

  @Post()
  create(@Body() createProductsPresentationDto: CreateProductsPresentationDto) {
    return this.productsPresentationService.create(createProductsPresentationDto);

  }

  @Get()
  findAll() {
    return this.productsPresentationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsPresentationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string, @Body() updateProductsPresentationDto: UpdateProductsPresentationDto) {
    return this.productsPresentationService.update(+id, updateProductsPresentationDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsPresentationService.remove(+id);
  }
}
