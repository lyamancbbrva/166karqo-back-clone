import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { ECountry, ECurrency } from "../../Core/app/enums";

@Entity('recipes')
export class Recipe extends CommonEntity{
    @Column({type: 'enum', enum: ECountry})
    country?: ECountry;

    @Column({type: 'varchar', nullable: false})
    weight?: string;

    @Column({type: 'enum', enum:ECurrency})
    currency?: ECurrency;

    @Column({type: 'varchar', nullable: false})
    price_manat?: string;

    @Column({type: 'varchar', nullable: false})
    price_foreign?: string;

}