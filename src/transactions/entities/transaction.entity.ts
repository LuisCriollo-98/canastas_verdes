import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number

    @Column('decimal')
    total: number

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    //Fecha de transaccions o fecha de venta
    @CreateDateColumn()
    transactionsDate: Date

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

    @Column('decimal')
    price: number

    //Muchos contendidos pero solo un producto
    @ManyToOne(() => Product, (product) => product.id, { eager: true, cascade: true })
    product: Product
    @ManyToOne(() => Transaction, (transaction) => transaction.contents, { cascade: true })
    transaction: Transaction
}
