import { Category } from "../../categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Farm } from "../../farms/entities/farm.entity";
import { ProductsPresentation } from "../../products_presentation/entities/products_presentation.entity";

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

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    costLogistics: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    costTransport: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    priceSuggested: number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    priceFinal: number


    @Column({ type: 'int' })
    inventory: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    //Relación de muchos a uno- todos los productos, crea una nueva columna donde se relaciona la categoria
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToOne(() => Farm, (farm) => farm.products)
    farm: Farm;

    @ManyToOne(() => ProductsPresentation, (presentation) => presentation.products)
    presentation: ProductsPresentation;

    /** @Column({type: 'int'})
    categoryId: number**/

}
