import { Router } from "express";
import { BranchController } from "./branch.controller";
import { roleCheck, useAuth } from "../../middlewares/auth.middleware";

export const branchRouter = Router();
const controller = BranchController();

branchRouter.post("/create", useAuth, roleCheck(["admin"]), controller.create);
branchRouter.put("/update/:id", useAuth, roleCheck(["admin"]), controller.update);
branchRouter.get("/all", controller.get);
branchRouter.delete("/delete/:id",useAuth,roleCheck(["admin"]),controller.deletee);
