import express from "express";
const router = express.Router();
import { createController, getController,getByIdController,updateController,deleteController,getCategoriesController, getByCategoryController } from "../controller/portfolio.controller.js";
import {protect} from "../midleware/auth.middleware.js";
router.use(protect);
import {checkPermission} from "./../midleware/permission.middleware.js";
import {MODULES} from "./../constants/module.js";
import {ACTIONS} from "./../constants/permission.js";
import { uploadPortfolioImage } from "../midleware/uploadproject.middleware.js";

router.get("/categories", getCategoriesController);
router.post("/",checkPermission(MODULES.PORTFOLIO,ACTIONS.CREATE),createController);
router.get("/", checkPermission(MODULES.PORTFOLIO,ACTIONS.READ),getController);
router.get("/:id",checkPermission(MODULES.PORTFOLIO,ACTIONS.READ), getByIdController);
router.put("/:id",checkPermission(MODULES.PORTFOLIO,ACTIONS.UPDATE), updateController );
router.delete("/:id",checkPermission(MODULES.PORTFOLIO,ACTIONS.DELETE), deleteController);
router.get("/category/:category", getByCategoryController);


// router.post("/",uploadPortfolioImage.single("projectImage"),createController);
// router.get("/",getController);
// router.get("/:id", getByIdController);
// router.put("/:id",uploadPortfolioImage.single("projectImage"), updateController );
// router.delete("/:id", deleteController);


export default router;