import express from "express";
const router = express.Router();
import { createResumeController, deleteResumeController, getResumeByidController, getResumeController, updateResumeController } from "../controller/resume.controller.js";
import { protect } from "../midleware/auth.middleware.js";

router.use(protect);

router.post("/", createResumeController);
router.get("/", getResumeController);
router.get("/:id", getResumeByidController);
router.put("/:id", updateResumeController);
router.delete("/:id", deleteResumeController);

export default router;