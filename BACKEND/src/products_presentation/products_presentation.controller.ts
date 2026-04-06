import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductsPresentationService } from './products_presentation.service';
import { CreateProductsPresentationDto } from './dto/create-products_presentation.dto';
import { UpdateProductsPresentationDto } from './dto/update-products_presentation.dto';
import { IdValidationPipe } from '../common/pipes/id-validation/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('products-presentation')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsPresentationController {
  constructor(
    private readonly productsPresentationService: ProductsPresentationService
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createProductsPresentationDto: CreateProductsPresentationDto) {
    return this.productsPresentationService.create(createProductsPresentationDto);

  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.productsPresentationService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.productsPresentationService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id', IdValidationPipe) id: string, @Body() updateProductsPresentationDto: UpdateProductsPresentationDto) {
    return this.productsPresentationService.update(+id, updateProductsPresentationDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.productsPresentationService.remove(+id);
  }
}
