// mamage by Super Admin
import Tenant from "./../models/tenant.model.js";

export const activateTenant = async (req, res) => {
  const { tenantId } = req.params;

  await Tenant.findByIdAndUpdate(tenantId, {
    "subscription.status": "ACTIVE",
    isActive: true,
    "subscription.expiresAt": new Date(Date.now() + 30*24*60*60*1000)
  });

};
export const deactivateTenant = async (req, res) => {
  const { tenantId } = req.params;

  await Tenant.findByIdAndUpdate(tenantId, {
    "subscription.status": "CANCELLED",
    isActive: true,
    "subscription.expiresAt": new Date(Date.now() + 30*24*60*60*1000)
  });
};
