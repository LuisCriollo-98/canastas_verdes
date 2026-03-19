import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('municipalities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MunicipalitiesController {
  constructor(
    private readonly municipalitiesService: MunicipalitiesService
  ) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalitiesService.create(createMunicipalityDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.municipalitiesService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id', IdValidationPipe) id: string,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalitiesService.update(+id, updateMunicipalityDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.municipalitiesService.remove(+id);
  }
}
