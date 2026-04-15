import { IsNotEmpty } from 'class-validator';

export class UpdateMunicipalityDto {
    @IsNotEmpty({ message: 'El nombre del municipio es requerido' })
    name: string;
}
