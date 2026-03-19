import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { GetFarmsQueryDto } from './dto/get-farm.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('farms')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll(@Query() query: GetFarmsQueryDto) {
    const municipality = query.municipality_id ? query.municipality_id : null
    const take = query.take ? query.take : 10
    const skip = query.skip ? query.skip : 0
    return this.farmsService.findAll(municipality, take, skip);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', IdValidationPipe) id: string) {
    return this.farmsService.findOne(+id);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id', IdValidationPipe) id: string,
    @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.farmsService.remove(+id);
  }
}
