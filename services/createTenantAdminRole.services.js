import Role from "../models/role.model.js";
import Permission from "../models/permission.model.js";

export const createTenantAdminRole = async (tenantId) => {
  const permissions = await Permission.insertMany([
    { module: "USER", actions: ["READ"] },
    { module: "ABOUT", actions: ["READ", "CREATE"] },
    { module: "CONTACT", actions: ["READ"] },
  ]);

  const role = await Role.create({
    roleName: "TENANT_ADMIN",
    tenantId,
    permissions: permissions.map(p => p._id),
  });

  return role;
};
