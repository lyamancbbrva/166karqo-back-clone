import { Router } from "express";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";
import { SiteController } from "./site.controller";
import { upload } from "../../middlewares/multer.middleware";

export const siteRouter = Router();
const controller = SiteController();

siteRouter.post('/create', useAuth, roleCheck(['admin']), upload.single('img'), controller.create)
siteRouter.put('/update/:id',useAuth, roleCheck(['admin']), upload.single('img'), controller.update)
siteRouter.delete('/delete/:id',useAuth, roleCheck(['admin']), controller.deletee)
siteRouter.get('/all',  controller.get)