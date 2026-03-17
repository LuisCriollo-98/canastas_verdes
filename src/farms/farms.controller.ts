import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { GetFarmsQueryDto } from './dto/get-farm.dto';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) { }

  @Post()
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  findAll(@Query() query: GetFarmsQueryDto) {
    const municipality = query.municipality_id ? query.municipality_id : null
    const take = query.take ? query.take : 10
    const skip = query.skip ? query.skip : 0
    return this.farmsService.findAll(municipality, take, skip);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.farmsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id', IdValidationPipe) id: string,
    @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.farmsService.remove(+id);
  }
}
