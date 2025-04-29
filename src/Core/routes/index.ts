import { Router } from "express";
import authRouter from "../api/auth/auth.routes";
import { packageRouter } from "../api/package/package.routes";
import { orderRouter } from "../api/order/order.routes";
import { useAuth } from "../middlewares/auth.middleware";
import { branchRouter } from "../api/branch/branch.routes";
import { recipeRouter } from "../api/recipe/recipe.routes";
import { newsRouter } from "../api/news/news.dto";

export const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use("/package", useAuth, packageRouter)
v1Router.use('/order', orderRouter)
v1Router.use('/branch',  branchRouter)
v1Router.use('/recipe',  recipeRouter)
v1Router.use('/news',  newsRouter)