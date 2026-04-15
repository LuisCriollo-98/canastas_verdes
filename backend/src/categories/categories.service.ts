import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity' // conexion con la entidades

@Injectable()
export class CategoriesService {
  //Agregar la entidad para que esten disponibles los metodos e interactuar con la base de datos
  constructor(
    //Decorador que le dice a NestJS: "Inyéctame el repositorio de la entidad Category"
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category> //Tipo genérico de TypeORM con métodos CRUD para Category
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    //Guarda un nuevo registro en la base de datos 
    this.categoryRepository.save(createCategoryDto)
    return { message: 'Categoria creada' }
  }

  findAll() {
    //llamar todas la categorias 
    return this.categoryRepository.find();
  }

  async findOne(id: number, products?: string) {

    const options: FindOneOptions<Category> = {
      where: { id }
    }
    if (products === "true") {
      options.relations = {
        products: {
          presentation: true
        }
      }
      //ordenar los productos por nombre
      options.order = {
        products: {
          name: "ASC"
        }
      }
    }
    //Permite buscar una categoria por ID
    const category = await this.categoryRepository.findOne(options)
    //Si no existe la categoria
    if (!category) {
      throw new NotFoundException('La categoria no existe')
    }
    return category
  }
  //Actualizar categorias por ID
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id) //findOne hace referencia a al anterior metodo
    category.name = updateCategoryDto.name
    return await this.categoryRepository.save(category)
  }
  //Eliminar categorias
  async remove(id: number) {
    const category = await this.findOne(id)
    await this.categoryRepository.remove(category) //Remove te muestra una mensaje al eliminar y ademas sirve para eliminar varios con una arreglo
    return ('Categoria eliminada')
  }
}
