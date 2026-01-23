import express from "express";

const router = express.Router();
// ------------------ Authentication Routes Import ------------------------------------
import permissionRouter from "./permission.routes.js";
import roleRouter from "./role.routes.js";
import userRouter from "./user.routes.js";
import authUser from "./auth.routes.js"



// ------------------ Modules & Seections Routes Import ---------------------------------
import aboutRouter from "./about.routes.js";



// ------------------ Authentication Routes Used ------------------------------------
router.use("/permission", permissionRouter);
router.use("/role",roleRouter );
router.use("/user", userRouter);
router.use("/login", authUser);

// ------------------ Modules & Seections Routes Used ---------------------------------
router.use("/about", aboutRouter);


export default router;