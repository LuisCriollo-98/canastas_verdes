import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, min } from "class-validator"

// Validaciones de productos
export class CreateProductDto {
    @IsNotEmpty({ message: 'El nombre de prodcuto es obligatorio' })
    @IsString({ message: 'Nombre no valido' })
    name: string

    @IsNotEmpty({ message: 'El Costo PCC es obligtaorio' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Costo PCC no valido' })
    price: number

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Precio final no valido' })
    @Min(0, { message: 'El precio final no puede ser negativo' })
    priceFinal?: number


    @IsNotEmpty({ message: 'La cantidad no puede ir vacia' })
    @IsNumber({ maxDecimalPlaces: 0 }, { message: 'Cantidad no valida' })
    inventory: number

    @IsNotEmpty({ message: 'Se debe relacionar una categoria' })
    @IsInt({ message: 'La categoria no es valida' })
    categoryId: number

    @IsNotEmpty({ message: 'Se debe relacionar un municipio' })
    @IsInt({ message: 'El municipio no es valido' })
    municipalityId: number

    @IsOptional()
    @IsInt({ message: 'La finca no es valida' })
    farmId?: number

    @IsNotEmpty({ message: 'Se debe relacionar una presentacion' })
    @IsInt({ message: 'La presentacion no es valida' })
    presentationId: number
}
