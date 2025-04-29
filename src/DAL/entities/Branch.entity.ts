import { Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";

@Entity('branches')
export class Branch extends CommonEntity{
    @Column({type: 'varchar', nullable: false})
    phone?: string;

    @Column({type: 'varchar', nullable: false})
    work_time?: string;

    @Column({type: 'varchar', nullable: false})
    address?: string;


}