
import Tenant from "./../models/tenant.model.js"
export const CreateTenant = async (data) => {
  return await Tenant.create({
    tenantName: data.tenantName,
    tenantPhoneNo: data.tenantPhoneNo,
    subscription: {
      status: "TRIAL",
      expiresAt: null,
    },
    isActive: true,
  });
};

export const GetTenant = async () =>{
    return await Tenant.find();
}
export const GetTenantById = async (id,) =>{
    return await Tenant.findById(id);
}
export const UpdateTenant = async (id,data) =>{
    return await Tenant.findByIdAndUpdate(id,data);
}
export const DeleteTenant = async (id) =>{
    return await Tenant.findByIdAndDelete(id);
}