import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation/id-validation.pipe';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/users/entities/user.entity';

@Controller('transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  //Cualquier usuario autenticado puede crear una transaccion
  @Roles(UserRole.ADMIN, UserRole.USER)
  create(@Body() createTransactionDto: CreateTransactionDto,
    @Req() req: any) {
    return this.transactionsService.create(createTransactionDto, req.user.id);
  }

  @Get()
  //Solo el admin puede ver todas las transacciones
  @Roles(UserRole.ADMIN)
  //Filtro por fecha de transaccion
  findAll(@Query('transactionDate') transactionDate: string) {
    return this.transactionsService.findAll(transactionDate);
  }

  @Get(':id')
  //Cualquier usuario autenticado puede ver una transaccion
  @Roles(UserRole.ADMIN, UserRole.USER)
  findOne(@Param('id', IdValidationPipe) id: string,
    @Req() req: any //Para obtener el token del usuario
  ) {
    //Obtener el id del usuario
    const user = req.user;
    const userId = user.role === 'admin' ? null : user.id;
    return this.transactionsService.findOne(+id, userId);
  }

  @Patch(':id')
  //Solo el admin puede actualizar una transaccion
  @Roles(UserRole.ADMIN)
  update(@Param('id', IdValidationPipe) id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  //Solo el admin puede borrar transacciones
  @Roles(UserRole.ADMIN)
  remove(@Param('id', IdValidationPipe) id: string) {
    return this.transactionsService.remove(+id);
  }
}
