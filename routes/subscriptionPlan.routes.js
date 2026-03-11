// routes/subscriptionPlan.routes.js
import express from 'express';
const router = express.Router();

import {
  createSubscriptionPlanController,
  getSubscriptionPlansController,
  getSubscriptionPlanByIdController,
  updateSubscriptionPlanController,
  deleteSubscriptionPlanController
} from '../controller/subscriptionPlan.controller.js';

import { protect } from '../midleware/auth.middleware.js';
import { checkPermission } from '../midleware/permission.middleware.js';
import { MODULES } from '../constants/module.js';
import { ACTIONS } from '../constants/permission.js';

router.use(protect);

// Superadmin managing global catalog of plans
router.post(
  '/',
//   checkPermission(MODULES.SUBSCRIPTION_PLAN, ACTIONS.CREATE),
  createSubscriptionPlanController
);

router.get(
  '/',
//   checkPermission(MODULES.SUBSCRIPTION_PLAN, ACTIONS.READ),
  getSubscriptionPlansController
);

router.get(
  '/:id',
//   checkPermission(MODULES.SUBSCRIPTION_PLAN, ACTIONS.READ),
  getSubscriptionPlanByIdController
);

router.put(
  '/:id',
//   checkPermission(MODULES.SUBSCRIPTION_PLAN, ACTIONS.UPDATE),
  updateSubscriptionPlanController
);

router.delete(
  '/:id',
  checkPermission(MODULES.SUBSCRIPTION_PLAN, ACTIONS.DELETE),
  deleteSubscriptionPlanController
);

export default router;
