import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMunicipalityDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre del municipio es requerido' })
    name: string;
}
