import { Router } from "express";
import { BranchController } from "./branch.controller";
import { roleCheck } from "../../middlewares/auth.middleware";

export const branchRouter = Router()
const controller = BranchController()

branchRouter.post('/create', roleCheck('admin'), controller.create)
branchRouter.put('/update/:id',roleCheck('admin'), controller.update)
branchRouter.get('/all', controller.get)
branchRouter.delete('/delete/:id',roleCheck('admin'), controller.deletee)
