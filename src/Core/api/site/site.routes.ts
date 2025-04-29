import { Router } from "express";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";
import { SiteController } from "./site.controller";
import { upload } from "../../middlewares/multer.middleware";

export const SiteRouter = Router();
const controller = SiteController();

SiteRouter.post('/create', useAuth, roleCheck('admin'), upload.single('img'), controller.create)
SiteRouter.put('/update/:id',useAuth, roleCheck('admin'), controller.create)
SiteRouter.delete('/delete/:id',useAuth, roleCheck('admin'), controller.create)
SiteRouter.get('/all',  controller.create)