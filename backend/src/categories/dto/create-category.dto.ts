import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
export class CreateCategoryDto {
    @IsNotEmpty({message: 'El nombre de la categoria no puede estar vacio'})
    name : string

    @IsOptional()
    @IsString({ message: 'La imagen debe ser un texto válido' })
    image?: string
}

