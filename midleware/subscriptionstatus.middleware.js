// import Tenant from "../models/tenant.model.js";

// export const checktenantStatus = async (req, res, next) => {
//   // superadmin should bypass

//   if (req.user.isSuperAdmin) {
//     return next();
//   }

//   const tenant = await Tenant.findById(req.tenantId.id);
//   if (!tenant || !tenant.isActive) {
//     return res.status(403).json({ message: "Tenant is Disabled" });
//   }

//   if (tenant.subscription.status != "ACTIVE") {
//     return res
//       .status(402)
//       .json({ message: "Subscription is Expired, Please Renew" });
//   }

//   next();
// };
// middleware/checktenantStatus.js
import Tenant from '../models/tenant.model.js';
import SubscriptionPlan from '../models/subscriptionPlan.model.js';

export const checktenantStatus = async (req, res, next) => {
  // 1) Super admin bypass
  if (req.user?.isSuperAdmin) {
    return next();
  }

  // 2) Load tenant
  const tenant = await Tenant.findById(req.tenantId.id);
  if (!tenant || !tenant.isActive) {
    return res.status(403).json({ message: 'Tenant is Disabled' });
  }

  const sub = tenant.subscription;
  const now = new Date();

  // 3) No subscription or expired
  if (!sub || !sub.expiresAt || sub.expiresAt < now) {
    return res
      .status(402)
      .json({ message: 'Subscription is Expired, Please Renew' });
  }

  // 4) Status must be ACTIVE
  if (sub.status !== 'ACTIVE') {
    return res
      .status(402)
      .json({ message: 'Subscription is not active, Please Renew' });
  }

  // 5) Optionally load plan, so downstream APIs can use userLimit/storageLimitGB
  if (sub.planId) {
    const plan = await SubscriptionPlan.findById(sub.planId);
    if (plan) {
      req.subscriptionPlan = plan;
    }
  }

  return next();
};
