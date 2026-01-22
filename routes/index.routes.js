import express from "express";

const router = express.Router();

import permissionRouter from "./permission.routes.js";

router.use("/permission", permissionRouter);


export default router;