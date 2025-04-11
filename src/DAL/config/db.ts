import { DataSource } from "typeorm";
import { AppConfig } from "../../conts";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: AppConfig.DB_LOCALHOST,
  port: Number(AppConfig.DB_PORT),
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
  database: AppConfig.DB_NAME,
  entities: ["./../../DAL/entities/*.ts"],
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});