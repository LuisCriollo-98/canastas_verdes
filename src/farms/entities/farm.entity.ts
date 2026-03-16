import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Farm {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: 'timestamp' })
    updatedAt: Date;

}
