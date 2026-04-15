import { ArgumentMetadata, Injectable, ParseIntPipe, BadRequestException } from '@nestjs/common';

//Validacion de datos de entrada
@Injectable()
export class IdValidationPipe extends ParseIntPipe{
  constructor(){
    super({
      exceptionFactory: () => new BadRequestException('ID no valido')
    })
  }
}
