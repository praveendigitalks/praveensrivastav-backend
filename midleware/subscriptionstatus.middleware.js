import Tenant from "../models/tenant.model.js";

export const checktenantStatus = async (req, res, next) => {
  // superadmin should bypass

  if (req.user.isSuperAdmin) {
    return next();
  }

  const tenant = await Tenant.findById(req.tenantId.id);
  if (!tenant || !tenant.isActive) {
    return res.status(403).json({ message: "Tenant is Disabled" });
  }

  if (tenant.subscription.status != "ACTIVE") {
    return res
      .status(402)
      .json({ message: "Subscription is Expired, Please Renew" });
  }

  next();
};
