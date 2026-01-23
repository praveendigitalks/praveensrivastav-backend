import express from "express";
const router = express.Router()
import { createRoleController, getRoleController } from "../controller/role.controller.js";
import { protect } from "../midleware/auth.middleware.js";


router.use(protect)

router.post("/", createRoleController);

router.get("/", getRoleController);

export default router