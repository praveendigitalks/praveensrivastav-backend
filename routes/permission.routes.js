import express from "express";
const router = express.Router();
import {createPermissionController, getPermissionController,getPermissionbyIdController,updatePermissionController, deletePermissionController} from "./../controller/permission.controller.js";
import {protect} from "./../midleware/auth.middleware.js"

// router.use(protect)

router.post("/", createPermissionController);

router.get("/",  getPermissionController);
router.get("/:id",  getPermissionbyIdController);
router.put("/:id",  updatePermissionController);
router.delete("/:id",  deletePermissionController);

export default router