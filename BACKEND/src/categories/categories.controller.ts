import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) { //Se utiliza IdValidationPipe para validar entradas de los datos
    return this.categoriesService.findOne(+id);
  }
  // Actualización de categorias
  @Patch(':id')
  update(
    @Param('id', IdValidationPipe) id: string, 
    @Body() updateCategoryDto: UpdateCategoryDto) {

    return this.categoriesService.update(+id, updateCategoryDto);
  }
  //Eliminar categorias
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
