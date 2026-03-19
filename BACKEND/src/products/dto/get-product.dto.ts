// Validacion de parametros del quuery en la petición GET, especificamente para filtrar productos
import { IsNumberString, IsOptional } from 'class-validator'
//Filtar productos por categoria
export class GetProductsQueryDto {
    @IsOptional()
    @IsNumberString({}, { message: 'La categoria debe ser un numero' })
    category_id: number //Permite validar productos por categoria

    @IsOptional()
    @IsNumberString({}, { message: 'La finca debe ser un número' })
    farm_id?: string;

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un numero' })
    take: number //Sirve para limitar cuantos prodcutos devuelve la consulta 

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un numero' })
    skip: number //Sirve para limitar cuantos prodcutos devuelve la consulta 
}


