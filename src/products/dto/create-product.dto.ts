import { IsIBAN, IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator"

// Validaciones de productos
export class CreateProductDto {
    @IsNotEmpty ({message: 'El nombre de prodcuto es obligatorio'})
    @IsString({message:'Nombre no valido'})
    name: string 

    @IsNotEmpty({message:'El precio es obligtaorio'})
    @IsNumber({maxDecimalPlaces:20}, {message: 'Precio no valido'})
    price: number

    @IsNotEmpty({message:'La cantidad no puede ir vacia'})
    @IsNumber({maxDecimalPlaces:0}, {message: 'Cantidad no valida'})
    inventory: number

    @IsNotEmpty({message:'Se debe relacionar una categoria'})
    @IsInt({message:'La categoria no es valida'})
    categoryId: number

    @IsNotEmpty({message:'Se debe relacionar una finca'})
    @IsInt({message:'La finca no es valida'})
    farmId: number

    @IsNotEmpty({message:'Se debe relacionar una presentacion'})
    @IsInt({message:'La presentacion no es valida'})
    presentationId: number
}
