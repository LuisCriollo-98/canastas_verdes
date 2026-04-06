import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('categories')
@UseGuards(JwtAuthGuard, RolesGuard)

export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(
    @Param('id', IdValidationPipe) id: string,
    @Query('products') products?: string
  ) { //Se utiliza IdValidationPipe para validar entradas de los datos
    return this.categoriesService.findOne(+id, products);
  }
  // Actualización de categorias
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', IdValidationPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto) {

    return this.categoriesService.update(+id, updateCategoryDto);
  }
  //Eliminar categorias
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.categoriesService.remove(+id);
  }
}
