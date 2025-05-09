import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Packagee } from "./Package.entity";

@Entity('news')
export class News extends CommonEntity{
    @Column({type: 'varchar', nullable: false})
    tittle?: string;

    @Column()
    img_url?: string;

    @Column({type: 'varchar'})
    description?: string;

}