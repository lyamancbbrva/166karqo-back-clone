import { IsDefined } from "class-validator";

export class PackageDto {
	@IsDefined({ message: "following number is required" })
	following_number?: number;

	@IsDefined({ message: "store is required" })
	store?: string;


	@IsDefined({ message: "product name is required" })
	product_name?: string;


	@IsDefined({ message: "amount is required" })
	amount?: string;


	@IsDefined({ message: "weight is required" })
	weight?: string;


	@IsDefined({ message: "delivery is required" })
	delivery?: string;
}
