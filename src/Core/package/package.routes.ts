import { Router } from "express";
import { PackageController } from "./package.controller";
import { roleCheck, useAuth } from "../middlewares/auth.middleware";

export const packageRouter = Router()
const controller = PackageController()

packageRouter.post('/create', useAuth, controller.create)
packageRouter.get('/all', useAuth, controller.get)
packageRouter.put('/change-status/:id', useAuth, roleCheck('admin'), controller.changeStatus)