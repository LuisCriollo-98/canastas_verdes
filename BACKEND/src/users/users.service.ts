import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    //Busca si el correo ya existe
    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
    //Si el correo ya existe
    if (existingUser) {
      throw new ConflictException('El correo ya existe');
    }
    //Crea el usuario
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10)
    });
    return this.userRepository.save(user);
  }

  findAll() {
    //Busca todos los usuarios  
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'address', 'role', 'isActive', 'createdAt']
    })
  }

  async findOne(id: number) {
    //Busca el usuario por ID
    const user = await this.userRepository.findOneBy({ id });
    //Si el usuario no existe
    if (!user) {
      throw new NotFoundException('El usuario no existe');
    }
    return user;
  }
  //Busca el usuario por correo
  async findByEmail(email: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email })
      .getOne();
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    //Busca el usuario por ID
    const user = await this.findOne(id);
    //Si el usuario no existe
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    //Actualiza los datos del usuario
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    //Busca el usuario por ID
    const user = await this.findOne(id);
    //Elimina el usuario
    await this.userRepository.remove(user);
    return { message: 'Usuario eliminado con exito' };
  }
}
