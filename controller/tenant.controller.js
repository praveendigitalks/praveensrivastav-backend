import {
  CreateTenant,
  GetTenant,
  GetTenantById,
  UpdateTenant,
  DeleteTenant,
} from "../services/tenant.services.js";

export const CreateTenantController = async (req, res) => {
  try {
    const tenants = await CreateTenant(req.body);
    return res.status(201).json(tenants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetTenantController = async (req, res) => {
  try {
    const tenants = await GetTenant();
    return res.status(200).json(tenants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const GetTenantByIdController = async (req, res) => {
  try {
    const tenants = await GetTenantById(req.params.id);
    return res.status(200).json(tenants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const UpdateTenantController = async (req, res) => {
  try {
    const tenants = await UpdateTenant(req.params.id,req.body);
    return res.status(201).json(tenants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


export const DeleteTenantController = async (req, res) => {
  try {
    const tenants = await DeleteTenant(req.params.id);
    return res.status(201).json(tenants);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
