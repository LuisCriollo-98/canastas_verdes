import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60 })
    name: string;

}