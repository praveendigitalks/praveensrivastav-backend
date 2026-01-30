import express from "express";
const router = express.Router();
import { createController, getController,getByIdController,updateController,deleteController } from "../controller/contact.controller.js";
import {protect} from "../midleware/auth.middleware.js"
router.use(protect);
import {checkPermission} from "./../midleware/permission.middleware.js";
import {MODULES} from "./../constants/module.js";
import {ACTIONS} from "./../constants/permission.js";

router.post("/",checkPermission(MODULES.CONTACT, ACTIONS.CREATE),createController);
router.get("/",checkPermission(MODULES.CONTACT, ACTIONS.READ), getController);
router.get("/:id",checkPermission(MODULES.CONTACT, ACTIONS.READ), getByIdController);
router.put("/:id",checkPermission(MODULES.CONTACT, ACTIONS.UPDATE), updateController );
router.delete("/:id",checkPermission(MODULES.CONTACT, ACTIONS.DELETE), deleteController);

export default router ;