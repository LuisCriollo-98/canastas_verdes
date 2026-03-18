import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { Municipality } from './entities/municipality.entity';

@Injectable()
export class MunicipalitiesService {
  constructor(
    @InjectRepository(Municipality) private readonly municipalityRepository: Repository<Municipality>,
  ) { }

  async create(createMunicipalityDto: CreateMunicipalityDto) {
    const municipality = this.municipalityRepository.create(createMunicipalityDto);
    await this.municipalityRepository.save(municipality);
    return { message: 'Municipio creado correctamente' };
  }

  findAll() {
    return this.municipalityRepository.find();
  }

  async findOne(id: number) {
    const municipality = await this.municipalityRepository.findOneBy({ id });
    if (!municipality) {
      throw new NotFoundException('El Municipio no existe');
    }
    return municipality;
  }

  async update(id: number, updateMunicipalityDto: UpdateMunicipalityDto) {
    const municipality = await this.findOne(id);
    municipality.name = updateMunicipalityDto.name;
    await this.municipalityRepository.save(municipality);
    return { message: 'Municipio actualizado correctamente' };
  }

  async remove(id: number) {
    const municipality = await this.findOne(id);
    await this.municipalityRepository.remove(municipality);
    return { message: 'Municipio eliminado correctamente' };
  }
}
