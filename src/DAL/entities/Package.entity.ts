import { Column, Entity, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { EStatus } from "../../Core/app/enums";
import { Order } from "./Order.entity";

@Entity('packages')
export class Packagee extends CommonEntity {
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

    @Column({type:'enum', enum: EStatus, default: EStatus.BEYANNAMESIZ})
	status?: EStatus;

	@ManyToOne(() => User, (user) => user.packages)
	user?: User;

	@ManyToOne(() => Order, (order) => order.packages )
	order!: Order;
}
