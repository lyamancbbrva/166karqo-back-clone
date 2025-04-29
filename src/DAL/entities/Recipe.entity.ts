import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Packagee } from "./Package.entity";

@Entity('recipes')
export class Recipe extends CommonEntity{
    @Column({type: 'varchar', nullable: false})
    country?: string;

    @Column({type: 'varchar', nullable: false})
    weight?: string;

    @Column({type: 'varchar', nullable: false})
    manat?: string;

    @Column({type: 'varchar', nullable: false})
    phone?: string; 
}