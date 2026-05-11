// Validacion de parametros del quuery en la petición GET, especificamente para filtrar productos
import { IsNumberString, IsOptional, IsString } from 'class-validator'
//Filtar productos por categoria
export class GetProductsQueryDto {
    @IsOptional()
    @IsNumberString({}, { message: 'La categoria debe ser un numero' })
    category_id: number

    @IsOptional()
    @IsNumberString({}, { message: 'La finca debe ser un número' })
    farm_id?: number;

    @IsOptional()
    @IsNumberString({}, { message: 'El municipio debe ser un número' })
    municipality_id?: number;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un numero' })
    take: number

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un numero' })
    skip: number
}


