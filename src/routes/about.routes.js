import express from "express";
const router = express.Router();
import {protect} from  "./../midleware/auth.middleware.js";
import { createAboutController, deleteAboutController, getAboutController, getAboutControllerbyId, updateAboutController } from "../controller/about.controller.js";
import {checkPermission} from './../midleware/permission.middleware.js';
import { MODULES } from "../constants/module.js";
import { ACTIONS } from "../constants/permission.js";
import { uploadAboutImage } from "../midleware/upload.middleware.js";
// router.use(protect);


router.get("/", getAboutController);
router.get("/:id", getAboutControllerbyId);
router.post("/",uploadAboutImage.single("image"),createAboutController);
router.put("/:id", updateAboutController);
router.delete("/:id", deleteAboutController);

export default router;