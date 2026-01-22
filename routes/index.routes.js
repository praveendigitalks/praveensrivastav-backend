import express from "express";

const router = express.Router();

import permissionRouter from "./permission.routes.js";
import roleRouter from "./role.routes.js";
import userRouter from "./user.routes.js";
import authUser from "./auth.routes.js"

router.use("/permission", permissionRouter);
router.use("/role",roleRouter );
router.use("/user", userRouter);
router.use("/login", authUser);

export default router;