import express from "express";
const router = express.Router();
import { createResumeController, deleteResumeController, getResumeByidController, getResumeController, updateResumeController } from "../controller/resume.controller.js";
import { protect } from "../midleware/auth.middleware.js";
import {checkPermission} from "./../midleware/permission.middleware.js";
import {MODULES} from "./../constants/module.js";
import {ACTIONS} from "./../constants/permission.js";
router.use(protect);

router.post("/",checkPermission(MODULES.RESUME,ACTIONS.CREATE), createResumeController);
router.get("/",checkPermission(MODULES.RESUME,ACTIONS.READ), getResumeController);
router.get("/:id",checkPermission(MODULES.RESUME,ACTIONS.READ), getResumeByidController);
router.put("/:id",checkPermission(MODULES.RESUME,ACTIONS.UPDATE), updateResumeController);
router.delete("/:id",checkPermission(MODULES.RESUME,ACTIONS.DELETE), deleteResumeController);

export default router;