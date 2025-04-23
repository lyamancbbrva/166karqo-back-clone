import { Column } from "typeorm";
import { CommonEntity } from "./Common.entity";

export class Order extends CommonEntity{

    @Column({type: 'varchar', nullable: false})
    region?: string;

    @Column({type: 'varchar', nullable: false})
    time?: string;

    @Column({type: 'varchar', nullable: false})
    addrss?: string;

    @Column({type: 'varchar', nullable: false})
    phone?: string; 
}