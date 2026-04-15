import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Farm, (farm) => farm.municipality)
    farms: Farm[];

    @OneToMany(() => Product, (product) => product.municipality)
    products: Product[];
}