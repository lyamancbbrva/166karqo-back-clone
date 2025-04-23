import { Router } from "express";
import authRouter from "../api/auth/auth.routes";
import { packageRouter } from "../package/package.routes";

export const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use("/package", packageRouter)