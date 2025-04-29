import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";

@Entity('sites')
export class Site extends CommonEntity{
    @Column({type: 'varchar', nullable: false})
    link?: string;

    @Column()
    img_url?: string;
}