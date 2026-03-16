import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MunicipalitiesService } from './municipalities.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';

@Controller('municipalities')
export class MunicipalitiesController {
  constructor(
    private readonly municipalitiesService: MunicipalitiesService
  ) { }

  @Post()
  create(@Body() createMunicipalityDto: CreateMunicipalityDto) {
    return this.municipalitiesService.create(createMunicipalityDto);
  }

  @Get()
  findAll() {
    return this.municipalitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.municipalitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: string,
    @Body() updateMunicipalityDto: UpdateMunicipalityDto) {
    return this.municipalitiesService.update(+id, updateMunicipalityDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.municipalitiesService.remove(+id);
  }
}
