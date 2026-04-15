import {IsNotEmpty} from 'class-validator'
export class CreateCategoryDto {
    @IsNotEmpty({message: 'El nombre de la categoria no puede estar vacio'})
    name : string
}
