import { json } from "express";
import {
  createUser,
  getUser,
  getUserbyId,
  updateUser,
  deleteUser,
  getLoggeduserdevcies,
} from "../services/user.services.js";

export const CreateUserController = async (req, res) => {
  try {
    const users = await createUser(req.body);
    return res.status(201).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const GetUserController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    console.log("🚀 ~ GetUserController ~ tenantId:", tenantId)
    const users = await getUser(tenantId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const GetUserControllerByid = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const users = await getUserbyId(req.params.id,tenantId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateUserController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

    const users = await updateUser(req.params.id,tenantId, req.body);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};  
export const deleteUserController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const users = await deleteUser(req.params.id,tenantId);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLoggedUserDevicesController = async (req, res) => {
  try {
    const userdevices = await getLoggeduserdevcies(req.params.id);
    return res.status(200).json(userdevices);
  } catch (error) {
    // console.log("🚀 ~ getLoggedUserDevicesController ~ error:", error)
    return res.status(400).json({ error: error.message });
  }
};
