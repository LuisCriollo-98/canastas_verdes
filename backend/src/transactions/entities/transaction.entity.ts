import { Product } from "../../products/entities/product.entity";
import { User } from "../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum OrderStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    total: number

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    status: OrderStatus
    //Fecha de transaccions o fecha de venta
    @CreateDateColumn()
    transactionsDate: Date

    @ManyToOne(() => User, (user) => user.transactions)
    user: User;

    @OneToMany(() => TransactionContents, (transaction) => transaction.transaction)
    contents: TransactionContents[]
}

//Contenido de la ventas
@Entity()
export class TransactionContents {

    @PrimaryGeneratedColumn()
    id: number

    @Column('int')
    quantity: number

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    price: number
    //Muchos contendidos pero solo un producto
    @ManyToOne(() => Product, (product) => product.id, { eager: true, cascade: true })
    product: Product
    @ManyToOne(() => Transaction, (transaction) => transaction.contents)
    transaction: Transaction
}
