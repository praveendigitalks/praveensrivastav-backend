import express from "express";
const router = express.Router();
import {CreateTenantController, GetTenantByIdController, GetTenantController, UpdateTenantController, DeleteTenantController} from "../controller/tenant.controller.js";
import { activateTenant, cancelTenant } from "../services/subscription.services.js";
import { protect } from "../midleware/auth.middleware.js";


router.use(protect);

router.post("/", CreateTenantController);
router.get("/", GetTenantController);
router.get("/:id", GetTenantByIdController);
router.put("/:id",UpdateTenantController);
router.delete("/:id", DeleteTenantController);


// subscription management routes
router.put(":/id", activateTenant);
router.put(":/id", cancelTenant);

export default router;