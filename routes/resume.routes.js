import express from "express";
const router = express.Router();
import { createResumeController, deleteResumeController, getResumeByidController, getResumeController, updateResumeController } from "../controller/resume.controller.js";
import { protect } from "../midleware/auth.middleware.js";
import {checkPermission} from "./../midleware/permission.middleware.js";
import {MODULES} from "./../constants/module.js";
import {ACTIONS} from "./../constants/permission.js";
router.use(protect);

router.post("/",checkPermission(MODULES.RRESUME,ACTIONS.CREATE), createResumeController);
router.get("/",checkPermission(MODULES.RRESUME,ACTIONS.READ), getResumeController);
router.get("/:id",checkPermission(MODULES.RRESUME,ACTIONS.READ), getResumeByidController);
router.put("/:id",checkPermission(MODULES.RRESUME,ACTIONS.UPDATE), updateResumeController);
router.delete("/:id",checkPermission(MODULES.RRESUME,ACTIONS.DELETE), deleteResumeController);

export default router;