import express from "express";
const router = express.Router()
import { createRoleController, getRoleController, getRolebyIdController,updateRoleController, deleteRoleController } from "../controller/role.controller.js";
import { protect } from "../midleware/auth.middleware.js";
import { checkPermission } from "../midleware/permission.middleware.js";
import { MODULES } from "../constants/module.js";
import { ACTIONS } from "../constants/permission.js";
router.use(protect)
router.post("/",checkPermission(MODULES.ROLE,ACTIONS.CREATE), createRoleController);
router.get("/",checkPermission(MODULES.ROLE,ACTIONS.READ), getRoleController);
router.get("/:id",checkPermission(MODULES.ROLE,ACTIONS.READ), getRolebyIdController);
router.get("/:id",checkPermission(MODULES.ROLE,ACTIONS.UPDATE),updateRoleController);
router.get("/:id",checkPermission(MODULES.ROLE,ACTIONS.DELETE), deleteRoleController);

export default router