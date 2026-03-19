import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', IdValidationPipe) id: string) { //Se utiliza IdValidationPipe para validar entradas de los datos
    return this.categoriesService.findOne(+id);
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
