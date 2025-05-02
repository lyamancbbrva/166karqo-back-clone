import { Router } from "express";
import { OrderController } from "./order.controller";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";

export const orderRouter = Router()
const controller  = OrderController()

orderRouter.post('/create', useAuth, roleCheck(['admin']), controller.create)
orderRouter.get('/all', useAuth, controller.get)