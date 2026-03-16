import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductsPresentation {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 100 })
    description: string

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;
}
