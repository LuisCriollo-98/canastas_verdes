import { IsEnum } from 'class-validator';
import { OrderStatus } from '../entities/transaction.entity';

export class UpdateTransactionDto {
    @IsEnum(OrderStatus, { message: 'Estado no válido' })
    status: OrderStatus;
}
