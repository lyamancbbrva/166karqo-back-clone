import { Router } from "express";
import { RecipeController } from "./recipe.controller";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";

export const recipeRouter = Router();
const controller = RecipeController();

recipeRouter.post('/create', useAuth, roleCheck('admin'), controller.create)
recipeRouter.put('/update/:id',useAuth, roleCheck('admin'), controller.create)
recipeRouter.delete('/delete/:id',useAuth, roleCheck('admin'), controller.create)
recipeRouter.get('/all',  controller.create)