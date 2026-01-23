import express from "express";
const router = express.Router();
import {protect} from  "./../midleware/auth.middleware.js";
import { createAboutController, deleteAboutController, getAboutController, getAboutControllerbyId, updateAboutController } from "../controller/about.controller.js";
import {checkPermission} from './../midleware/permission.middleware.js';
import { MODULES } from "../constants/module.js";
import { ACTIONS } from "../constants/permission.js";
router.use(protect);


router.get("/", getAboutController);
router.get("/:id", getAboutControllerbyId);
router.post("/",checkPermission(MODULES.ABOUT,ACTIONS.CREATE), createAboutController);
router.put("/:id", updateAboutController);
router.delete("/:id", deleteAboutController);

export default router;