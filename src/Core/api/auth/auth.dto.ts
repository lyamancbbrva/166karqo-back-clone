import {
	IsDefined,
	IsEmail,
	Matches,
	ValidateIf,
    IsDate,
	MinLength,
} from "class-validator";

export class RegisterDto {
	@IsDefined({ message: "Name is required" })
	name?: string;

	@IsDefined({ message: "Surname is required" })
	surname?: string;

	@IsEmail()
	@IsDefined({ message: "E-mail is required" })
	email?: string;

	@Matches(/^\+994(50|51|55|70|77|99)[0-9]{7}$/, {
		message: "Phone is not correct format",
	})
	@IsDefined({ message: "Phone is required" })
	phone?: string;

	@IsDefined({ message: "Pin is required" })
	pin?: string;

	@Matches(/^[A-ZƏÖÜÇŞI]{2}\d{7}$/, {
		message: "Serial number is wrong format",
	})
	@IsDefined({ message: "Serial number is required" })
	serial_number?: string;

	@IsDefined({ message: "Adsress is required" })
	address?: string;

	@IsDefined({ message: "Password is required" })
	@MinLength(6)
	password?: string;

	@ValidateIf((o) => o.password === o.confirm_password)
	confirm_password?: string;

    @IsDefined({message: "Tax id is reqiured"})
	tax_id?: string;

    @IsDefined({message: "Station is reqiured"})
	station?: string;

    @IsDefined({message: "Birthdate is reqiured"})
	birthdate?: string;

	legal_entity?: Boolean;
}

export class LoginDto {

    @IsDefined({message: "E-mail is reqiured"})
	email?: string;

    @IsDefined({message: "Password is reqiured"})
	password?: string;
}
