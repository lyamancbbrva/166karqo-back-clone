import { Router } from "express";
import { PackageController } from "./package.controller";
import { roleCheck } from "../../middlewares/auth.middleware";

export const packageRouter = Router()
const controller = PackageController()

packageRouter.post('/create', roleCheck(['admin']), controller.create)
packageRouter.get('/all', controller.get)
packageRouter.put('/change-status/:id', roleCheck(['admin', 'courier']), controller.changeStatus)