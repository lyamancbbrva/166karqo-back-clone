import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Packagee } from "./Package.entity";

@Entity('orders')
export class Order extends CommonEntity{
    @Column({type: 'varchar', nullable: false})
    region?: string;

    @Column({type: 'varchar', nullable: false})
    time?: string;

    @Column({type: 'varchar', nullable: false})
    address?: string;

    @Column({type: 'varchar', nullable: false})
    phone?: string; 

    @OneToMany(()=> Packagee, (pckg) => pckg.order)
    packages!: Packagee[]
}