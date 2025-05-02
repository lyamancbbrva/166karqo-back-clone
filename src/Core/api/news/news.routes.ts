import { Router } from "express";
import { NewsController } from "./news.controller";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";
import { upload } from "../../middlewares/multer.middleware";

export const newsRouter = Router();
const controller = NewsController()

newsRouter.post('/create',  upload.single("img"), controller.create)
newsRouter.put('/update/:id',useAuth, upload.single('img'), roleCheck(['admin']), controller.update)
newsRouter.delete('/delete/:id',useAuth, roleCheck(['admin']), controller.deletee)
newsRouter.get('/all',  controller.get)