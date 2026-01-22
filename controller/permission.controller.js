import {
  getPermission,
  getPermissionByid,
  createPermission,
  updatePermission,
  deletePermission,
} from "../services/permission.services.js";

export const createPermissionController = async (req, res) => {
  try {
    // console.log("controller called");
    const permissions = await createPermission(req.body);
    return res.status(201).json(permissions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

export const getPermissionController = async (req, res) => {
  try {
    const permissions = await getPermission();
    return res.status(200).json(permissions);
  } catch (error) {
    return res.staus(500).json({ error: message.error });
  }
};
export const getPermissionbyIdController = async (req, res) => {
  try {
    const permissions = await getPermissionByid(req.params.id);
    return res.status(200).json(permissions);
  } catch (error) {
    return res.staus(500).json({ error: message.error });
  }
};
export const updatePermissionController = async (req, res) => {
  try {
    const permissions = await updatePermission(req.params.id, req.body);
    return res.status(200).json(permissions);
  } catch (error) {
    return res.staus(500).json({ error: message.error });
  }
};
export const deletePermissionController = async (req, res) => {
  try {
    const permissions = await deletePermission(req.params.id);
    return res.status(200).json(permissions);
  } catch (error) {
    return res.staus(500).json({ error: message.error });
  }
};
