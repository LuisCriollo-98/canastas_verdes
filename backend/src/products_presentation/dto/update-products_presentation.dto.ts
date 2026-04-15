import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsPresentationDto } from './create-products_presentation.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProductsPresentationDto extends PartialType(CreateProductsPresentationDto) {
    @IsNotEmpty({ message: 'La presentación del producto no puede estar vacía' })
    description: string;
}
