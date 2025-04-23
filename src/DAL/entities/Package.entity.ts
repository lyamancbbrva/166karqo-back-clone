import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";

@Entity('packages')
export class Package extends CommonEntity {
    @Column({type: 'int', nullable:false})
	following_number?: number;

    @Column({type:'varchar', nullable: false})
	store?: string;

    @Column({type:'varchar', nullable: false})
	product_name?: string;

    @Column({type:'varchar', nullable: false})
	amount?: string;

    @Column({type:'varchar', nullable: false})
	weight?: string;

    @Column({type:'varchar', nullable: false})
	delivery?: string;

    @Column({type:'varchar', nullable: false})
	status?: string;

	@ManyToOne(() => User, (user) => user.packages)
	user?: User;
}
