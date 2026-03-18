import { IsNumberString, IsOptional } from "class-validator";

export class GetFarmsQueryDto {
    @IsOptional()
    @IsNumberString({}, { message: 'El municipio debe ser un número' })
    municipality_id: number

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un número' })
    take: number

    @IsOptional()
    @IsNumberString({}, { message: 'La cantidad debe ser un número' })
    skip: number
}   