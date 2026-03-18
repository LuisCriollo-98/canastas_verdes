import { IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateFarmDto {
    @IsString({ message: 'Nombre no valido' })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name: string;

    @IsString({ message: 'Direccion no valida' })
    @IsNotEmpty({ message: 'La dirección es requerida' })
    address: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es requerido' })
    phone: string;

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail()
    email: string;

    @IsString({ message: 'Descripcion no valida' })
    @IsNotEmpty({ message: 'La descripción es requerida' })
    description: string;

    @IsNotEmpty({ message: 'El municipio es requerido' })
    @IsInt({ message: 'El municipio no es valido' })
    municipalityId: number;
}
