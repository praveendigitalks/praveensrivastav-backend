import express from "express";
const router = express.Router();
import { GetTenantByIdController, GetTenantController, UpdateTenantController, DeleteTenantController} from "../controller/tenant.controller.js";
import { CreateTenantController } from "../controller/createTenant.controller.js";
import { activateTenant, cancelTenant } from "../services/subscription.services.js";
import { protect } from "../midleware/auth.middleware.js";


router.use(protect);

router.post("/", CreateTenantController);
router.get("/", GetTenantController);
router.get("/:id", GetTenantByIdController);
router.put("/:id",UpdateTenantController);
router.delete("/:id", DeleteTenantController);


// subscription management routes
router.put("/:id/activate", activateTenant);
router.put("/:id/cancel", cancelTenant);


export default router;