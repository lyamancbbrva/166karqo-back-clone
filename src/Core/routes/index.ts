import { Router } from "express";
import authRouter from "../api/auth/auth.routes";
import { packageRouter } from "../api/package/package.routes";
import { orderRouter } from "../api/order/order.routes";
import { useAuth } from "../middlewares/auth.middleware";
import { branchRouter } from "../api/filial/branch.routes";

export const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use("/package", useAuth, packageRouter)
v1Router.use('/order', orderRouter)
v1Router.use('/branch', useAuth, branchRouter)