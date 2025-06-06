import { IsDefined, Matches } from "class-validator";

export class OrderDto {
	@IsDefined({ message: "region is reqiured" })
	region?: string;

	@IsDefined({ message: "time is reqiured" })
	time?: string;

	@IsDefined({ message: "adress is reqiured" })
	addess?: string;

	@Matches(/^\+994(50|51|55|70|77|99)[0-9]{7}$/, {
		message: "Phone is not correct format",
	})
	@IsDefined({ message: "phone is reqiured" })
	phone?: string;
}
