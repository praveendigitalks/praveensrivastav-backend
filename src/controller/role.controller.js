import {
  createRole,
  updateRole,
  getRole,
  getRoleById,
  deleteRole,
} from "../services/role.services.js";

export const createRoleController = async (req, res) => {
  try {
    const roles = await createRole(req.body);
    return res.status(201).json(roles);
  } catch (error) {
    console.log("🚀 ~ createRoleController ~ error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getRoleController = async(req, res) => {
    try{
        const roles = await getRole();
        return res.status(200).json(roles);
    }catch(error){
        return res.status(500).json({error : error.message})
    }
}
