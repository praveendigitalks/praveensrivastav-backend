import express from "express";
const router = express.Router();
import { CreateUserController, GetUserController,GetUserControllerByid, updateUserController,deleteUserController } from "../controller/user.controller.js";
import { protect } from "../midleware/auth.middleware.js";
router.use(protect)

router.post("/", CreateUserController);
router.get("/", GetUserController );


export default router;