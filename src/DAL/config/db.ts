import { DataSource } from "typeorm";
import { AppConfig } from "../../consts";
import { Branch } from "../entities/Branch.entity";
import { News } from "../entities/News.entity";
import { Order } from "../entities/Order.entity";
import { Packagee } from "../entities/Package.entity";
import { Recipe } from "../entities/Recipe.entity";
import { Site } from "../entities/Site.entity";
import { User } from "../entities/User.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: AppConfig.DB_LOCALHOST,
  port: Number(AppConfig.DB_PORT),
  username: AppConfig.DB_USERNAME,
  password: AppConfig.DB_PASSWORD,
  database: AppConfig.DB_NAME,
  entities: [Branch, News, Order, Packagee, Recipe, Site, User],
  // entities: ['../entities/*.entity.ts'],
  subscribers: [],
  migrations: [],
  logging: false,
  synchronize: true,
});