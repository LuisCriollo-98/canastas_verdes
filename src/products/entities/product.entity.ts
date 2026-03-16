import { Category } from "../../categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 60 })
    name: string

    @Column({ type: 'varchar', length: 140, default: 'default.png' })
    image: string

    @Column(({ type: 'decimal' }))
    price: number

    @Column({ type: 'int' })
    inventory: number

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

    //Relación de muchos a uno- todos los productos, crea una nueva columna donde se relaciona la categoria
    @ManyToOne(() => Category)
    category: Category

    /** @Column({type: 'int'})
    categoryId: number**/

}
