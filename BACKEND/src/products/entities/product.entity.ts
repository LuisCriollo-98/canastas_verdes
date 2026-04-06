import { Category } from "../../categories/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Farm } from "../../farms/entities/farm.entity";
import { ProductsPresentation } from "../../products_presentation/entities/products_presentation.entity";
import { Municipality } from "../../municipalities/entities/municipality.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 140, default: 'default.png' })
    image: string

    @Column(({ type: 'decimal', precision: 10, scale: 0 }))
    price: number

    @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
    costLogistics: number

    @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
    costTransport: number

    @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
    priceSuggested: number

    @Column({ type: 'decimal', precision: 10, scale: 0, default: 0 })
    priceFinal: number


    @Column({ type: 'int', default: 0 })
    inventory: number

    @Column({ type: 'varchar', length: 20, unique: true })
    code: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    //Relación de muchos a uno- todos los productos, crea una nueva columna donde se relaciona la categoria
    @ManyToOne(() => Category, (category) => category.products)
    category: Category

    @ManyToOne(() => Municipality, (municipality) => municipality.products)
    municipality: Municipality;

    @ManyToOne(() => Farm, (farm) => farm.products, {nullable: true})
    farm: Farm | null;

    @ManyToOne(() => ProductsPresentation, (presentation) => presentation.products)
    presentation: ProductsPresentation;

    /** @Column({type: 'int'})
    categoryId: number**/

}
