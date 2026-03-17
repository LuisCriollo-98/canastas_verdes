import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Farm } from '../../farms/entities/farm.entity';

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 60 })
    name: string;

    @OneToMany(() => Farm, (farm) => farm.municipality, { cascade: true })
    farms: Farm[];
}