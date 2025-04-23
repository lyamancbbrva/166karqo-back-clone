import e, { NextFunction, Request, Response } from "express";
import { LoginDto, RegisterDto } from "./auth.dto";
import { validate } from "class-validator";
import { AppConfig, errorMessages } from "../../../consts";
import { User } from "../../../DAL/entities/User.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response, next: NextFunction) => {
	const {
		name,
		surname,
		phone,
		email,
		password,
		address,
		station,
		pin,
		serial_number,
		confirm_password,
		tax_id,
		birthdate,
		legal_entity,
	} = req.body;

	
	const data = new RegisterDto();
	data.name = name;
	data.surname = surname;
	data.email = email;
	data.password = password;
	data.birthdate = birthdate;
	data.confirm_password = confirm_password;
	data.legal_entity = legal_entity;
	data.tax_id = tax_id;
	data.pin = pin;
	data.serial_number = serial_number;
	data.address = address;
	data.station = station;
	data.phone = phone;

	const validData = await validate(data);
	if (validData.length > 0) {
		return next(
			res.status(422).json({
				message: errorMessages[422],
				errors: validData.map((error) => ({
					field: error.property,
					message: Object.values(error.constraints || {})[0],
				})),
			})
		);
	}
	try {
		const exist_user = await User.findOne({ where: [
			{ email },
			{ phone },
			{ pin },
			{ serial_number },
			{ tax_id },
		], });
		if (exist_user) {
			return next(
				res.json({
					message: "User is already exist",
				})
			);
		}
		const randomCode = Math.floor(100000 + Math.random()*900000)

		const hashedPass = await bcrypt.hash(password, 10);
		await User.create({
			name,
			surname,
			email,
			password: hashedPass,
			phone,
			address,
			station,
			legal_entity,
			pin,
			serial_number,
			birthdate,
			tax_id,
			customer_code: randomCode
		}).save();
		return next(
			res.status(201).json({
				message: "User created succesfully",
			})
		);
	} catch (error:any) {
		console.log(error)
		if (error.code === 'ER_DUP_ENTRY') {
			const field = error?.sqlMessage?.match(/for key '(.+?)'/)?.[1] || 'unknown';
			return next(
				res.status(400).json({
					message: `Dəyər təkrarlandığı üçün əlavə etmək mümkün olmadı. Təkrar sahə: ${field}`,
				})
			);
		}
		return next(
			res.status(500).json({
				message: errorMessages[500],
				error,
			})
		);
	}
};
const login = async (req: Request, res: Response, next: NextFunction) => {
	
	const { email, password } = req.body;

	const data = new LoginDto();
	data.email = email;
	data.password = password;

	const validData = await validate(data);

	if (validData.length > 0) {
		return next(
			res.status(422).json({
				message: errorMessages[422],
				errors: validData.map((error) => ({
					field: error.property,
					message: Object.values(error.constraints || {})[0],
				})),
			})
		);
	}
	try {
		const exist_user = await User.findOne({ where: { email } });
		if (!exist_user) {
			return next(res.status(401).json({
				message: "E-mail or password is wrong!",
			}))
		}
		if (!exist_user.password) {
			return next(res.json({
				message: "E-mail or password is wrong"
			}))
		}
		const isPassValid = await bcrypt.compare(password, exist_user.password);

        if (!isPassValid) {
            return next(res.status(401).json({
                message: "E-mail or password is wrong!"
            }))
        }

		const jwt_payload = {
			id: exist_user?.id,
		};
		const secret_key = AppConfig.JWT_SECRET;
		if (!secret_key) {
			return next(
				res.status(500).json({
					message: errorMessages[500],
					errors: "JWT secret is not defined",
				})
			);
		}
		const token = jwt.sign(jwt_payload, secret_key);
		return next(
			res.json({
				message: "Login succesfully",
				token,
			})
		);
	} catch (error) {
		return next(
			res.status(500).json({
				message: errorMessages[500],
				error,
			})
		);
	}
};
export const AuthController = () => ({
	register,
	login,
});
