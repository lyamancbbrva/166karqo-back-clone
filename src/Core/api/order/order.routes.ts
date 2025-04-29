import { Router } from "express";
import { OrderController } from "./order.controller";
import { useAuth } from "../../middlewares/auth.middleware";

export const orderRouter = Router()
const controller  = OrderController()

orderRouter.post('/create', useAuth, controller.create)