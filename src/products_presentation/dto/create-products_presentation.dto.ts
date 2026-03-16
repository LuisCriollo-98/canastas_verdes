import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductsPresentationDto {
    @IsString()
    @IsNotEmpty({ message: 'La presentación del prodcuto es requerida' })
    description: string
}
