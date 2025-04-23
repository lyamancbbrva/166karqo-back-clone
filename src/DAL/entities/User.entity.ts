import { Column, Entity, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { ENationality, ESex, EUserRole } from "../../Core/app/enums";
import { Package } from "./Package.entity";

@Entity("users")
export class User extends CommonEntity {
	@Column({ type: "varchar", nullable: false })
	name?: string;

	@Column({ type: "varchar", nullable: false })
	surname?: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	email?: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	phone?: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	pin?: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	serial_number?: string;

	@Column({ type: "varchar", nullable: false })
	address?: string;

	@Column({ type: "varchar", nullable: false })
	password?: string;

	@Column({ type: "varchar", unique:true })
	tax_id?: string;

	@Column({ type: "varchar", nullable: false })
	station?: string;

	@Column({ type: "date", nullable: false })
	birthdate?: Date;

	@Column({ type: "boolean", default: false })
	legal_entity?: Boolean;

	@Column({ type: "enum", enum: ESex, default: ESex.MAN, nullable: false })
	sex?: ESex;

	@Column({
		type: "enum",
		enum: ENationality,
		default: ENationality.AZERBAIJAN,
		nullable: false,
	})
	nationality?: ENationality;

	@Column({ type: "enum", enum: EUserRole, default: EUserRole.CUSTOMER })
	role?: EUserRole;

	@OneToMany(() => Package, (packagee) => packagee.user)
	packages?: Package[];
}
