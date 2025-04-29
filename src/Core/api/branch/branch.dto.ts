import { IsDefined, Matches } from "class-validator";

export class BranchDto {
	@IsDefined({ message: "Phone number is required" })
	@Matches(/^\+994(50|51|55|70|77|99)[0-9]{7}$/, {
		message: "Phone is not correct format",
	})
	phone?: number;

	@IsDefined({ message: "Work time is required" })
	work_time?: string;

	@IsDefined({ message: "Address is required" })
	address?: string;
}
