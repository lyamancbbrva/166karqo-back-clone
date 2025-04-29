import { DataSource } from "typeorm";
import { AppConfig } from "../../consts";
import { User } from "../entities/User.entity";
import { Order } from "../entities/Order.entity";
import { Packagee } from "../entities/Package.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: AppConfig.DB_LOCALHOST,
  port: Number(AppConfig.DB_PORT),
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
  database: AppConfig.DB_NAME,
  entities: [User, Packagee, Order],
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});