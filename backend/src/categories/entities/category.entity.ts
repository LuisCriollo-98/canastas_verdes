import { Product } from '../../products/entities/product.entity'
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
@Entity()
export class Category {
    @PrimaryGeneratedColumn()//Definir llave primaria, autoincremental
    id: number

    @Column({ type: 'varchar', length: 60 }) // Crear columna name
    name: string

    @Column({ type: 'varchar', length: 255, default: 'default.png' }) // Crear columna image
    image: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    //Relación de uno a muchos   se hace a la relación inversa
    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    products: Product[]

}

