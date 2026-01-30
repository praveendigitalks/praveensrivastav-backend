import express from "express";
const router = express.Router();
import {protect} from  "./../midleware/auth.middleware.js";
import { createAboutController, deleteAboutController, getAboutController, getAboutControllerbyId, updateAboutController } from "../controller/about.controller.js";
import {checkPermission} from './../midleware/permission.middleware.js';
import { MODULES } from "../constants/module.js";
import { ACTIONS } from "../constants/permission.js";
import { uploadAboutImage } from "../midleware/upload.middleware.js";
router.use(protect);


router.get("/",checkPermission(MODULES.ABOUT, ACTIONS.READ), getAboutController);
router.get("/:id",checkPermission(MODULES.ABOUT, ACTIONS.READ), getAboutControllerbyId);
router.post("/",checkPermission(MODULES.ABOUT, ACTIONS.CREATE),uploadAboutImage.single("image"),createAboutController);
router.put("/:id",checkPermission(MODULES.ABOUT, ACTIONS.UPDATE),uploadAboutImage.single("image"), updateAboutController);
router.delete("/:id",checkPermission(MODULES.ABOUT, ACTIONS.DELETE), deleteAboutController);

export default router;