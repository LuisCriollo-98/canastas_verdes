import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Municipality } from '../municipalities/entities/municipality.entity';
import { GetFarmsQueryDto } from './dto/get-farm.dto';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm) private readonly farmRepository: Repository<Farm>,
    @InjectRepository(Municipality) private readonly municipalityRepository: Repository<Municipality>
  ) { }

  async create(createFarmDto: CreateFarmDto) {
    const municipality = await this.municipalityRepository.findOneBy({ id: createFarmDto.municipalityId });
    //Validar que el municipio exista
    if (!municipality) {
      let errors: string[] = []
      errors.push('El municipio no existe')
      throw new NotFoundException(errors)
    }
    //Guardar la finca
    const farm = await this.farmRepository.save({
      ...createFarmDto,
      municipality,
    })
    return { message: 'Finca creada exitosamente' }
  }

  async findAll(query: GetFarmsQueryDto) {
    const municipalityId = query.municipality_id ? query.municipality_id : null
    const take = query.take ? query.take : 10
    const skip = query.skip ? query.skip : 0
    const options: FindManyOptions<Farm> = {
      relations: {
        municipality: true
      },
      order: { id: 'DESC' },
      take,
      skip
    };
    if (municipalityId) {
      options.where = {
        municipality: {
          id: municipalityId
        }
      }
    }
    const [farms, total] = await this.farmRepository.findAndCount(options);
    return { farms, total }
  }

  async findOne(id: number) {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: { municipality: true },
    });
    if (!farm) {
      throw new NotFoundException('Finca no encontrada')
    }
    return farm
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    const farm = await this.findOne(id);
    Object.assign(farm, updateFarmDto)

    //Actualizar el municipio
    if (updateFarmDto.municipalityId) {
      const municipality = await this.municipalityRepository.findOneBy({ id: updateFarmDto.municipalityId });
      //Si el municipio no existe
      if (!municipality) {
        let errors: string[] = []
        errors.push('El municipio no existe')
        throw new NotFoundException(errors);
      }
      farm.municipality = municipality;
    }
    return await this.farmRepository.save(farm);
  }

  async remove(id: number) {
    const farm = await this.findOne(id);
    await this.farmRepository.remove(farm);
    return { message: 'Finca eliminada exitosamente' }
  }
}
