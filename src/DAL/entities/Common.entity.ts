import { BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class CommonEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select:false })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', select: false })
    updated_at!: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true, select: false })
    deleted_at?: Date;

}