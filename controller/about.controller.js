import User from "../models/user.model.js";
import {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../services/about.services.js";
export const createAboutController = async (req, res) => {
  try {
    const data = {
      ...req.body,
      image: req.file ? `/upload/about/${req.file.filename}` : null,
    };

    const user = await User.findOne({
      isSuperAdmin: false,
      tenantId: { $ne: null }
    });

    if (!user) {
      return res.status(400).json({ message: "Tenant user not found" });
    }

    const about = await createAbout(user.tenantId, data);

    return res.status(201).json(about);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



export const getAboutController = async (req, res) => {
  try {
    const user = await User.findOne({
      isSuperAdmin: false,
      tenantId: { $ne: null }
    });
    console.log(user.tenantId, "tenantId");
    const abouts = await getAbout(user.tenantId);
    console.log(abouts, "abouts");

    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ getAboutController ~ error:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const getAboutControllerbyId = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const abouts = await getAboutById(req.params.id, tenantId);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ getAboutControllerbyId ~ error:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const updateAboutController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const abouts = await updateAbout(req.params.id, tenantId, req.body);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ updateAboutController ~ error:", error);
    return res.status(500).json({ error: error.message });
  }
};
export const deleteAboutController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const abouts = await deleteAbout(req.params.id, tenantId);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ deleteAboutController ~ error:", error);
    return res.status(500).json({ error: error.message });
  }
};
