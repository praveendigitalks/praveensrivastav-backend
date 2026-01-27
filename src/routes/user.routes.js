import express from "express";
const router = express.Router();
import { CreateUserController, GetUserController,GetUserControllerByid, updateUserController,deleteUserController, getLoggedUserDevicesController } from "../controller/user.controller.js";
import { protect } from "../midleware/auth.middleware.js";
router.use(protect)

router.post("/", CreateUserController);
router.get("/", GetUserController );
router.get("/logdevices/:id", getLoggedUserDevicesController);

export default router;