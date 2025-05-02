import { Router } from "express";
import { RecipeController } from "./recipe.controller";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";

export const recipeRouter = Router();
const controller = RecipeController();

recipeRouter.post('/create', useAuth, roleCheck(['admin']), controller.create)
recipeRouter.put('/update/:id',useAuth, roleCheck(['admin']), controller.update)
recipeRouter.delete('/delete/:id',useAuth, roleCheck(['admin']), controller.deletee)
recipeRouter.get('/all',  controller.get)