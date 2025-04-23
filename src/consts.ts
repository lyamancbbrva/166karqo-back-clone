import dotenv from "dotenv";
dotenv.config();

export const AppConfig = {
	PORT: process.env.PORT,
	DB_USERNAME: process.env.DB_USERNAME,
	DB_PASSWORD: process.env.DB_PASSWORD,
	DB_HOST: process.env.DB_HOST,
	DB_PORT: process.env.DB_PORT,
	DB_NAME: process.env.DB_NAME,
	DB_LOCALHOST: process.env.DB_LOCALHOST,
	JWT_SECRET: process.env.JWT_SECRET,
};
export const errorMessages = {
    500: "Internal server error",
    401: "Unauthorization",
    409: "Conflict",
    422: "Validation error",
    404: "Not found",
	403: "You don't have access "
    
}
export const okayMessages = {
	201: "Created succesfully",
	
}