import express from "express";
const router = express.Router();
import {createPermissionController, getPermissionController,getPermissionbyIdController,updatePermissionController, deletePermissionController} from "./../controller/permission.controller.js";
import {protect} from "./../midleware/auth.middleware.js";
import {checkPermission} from "./../midleware/permission.middleware.js";
import {MODULES} from "./../constants/module.js";
import {ACTIONS} from "./../constants/permission.js";
router.use(protect);

router.post("/",checkPermission(MODULES.PERMISSION, ACTIONS.CREATE),createPermissionController);
router.get("/",checkPermission(MODULES.PERMISSION, ACTIONS.READ),  getPermissionController);
router.get("/:id",checkPermission(MODULES.PERMISSION, ACTIONS.READ),  getPermissionbyIdController);
router.put("/:id",checkPermission(MODULES.PERMISSION, ACTIONS.UPDATE),  updatePermissionController);
router.delete("/:id",checkPermission(MODULES.PERMISSION, ACTIONS.DELETE),  deletePermissionController);

export default router;