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
    const tenantId = req.user.tenantId;
    
    const data = {
      ...req.body,
      image: req.file ? `/upload/about/${req.file.filename}` : null,
    };
    
    console.log('Raw data:', data); // Debug
    
    const about = await createAbout(tenantId, data);
    return res.status(201).json(about);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateAboutController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    // console.log('🔍 Update Request:');
    // console.log('- req.params.id:', req.params.id);
    // console.log('- tenantId:', tenantId);
    // console.log('- req.body:', req.body);
    // console.log('- req.file:', req.file);
    
    const data = {
      ...req.body,
      image: req.file ? `/upload/about/${req.file.filename}` : req.body.existingImage,
    };
    
    console.log('- Raw data.webskills:', data.webskills);
    
    const about = await updateAbout(req.params.id, tenantId, data);
    console.log('- Updated about:', about);
    
    return res.status(200).json(about);
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ error: error.message });
  }
};





export const getAboutController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    console.log(tenantId, "tenantId get");
    const abouts = await getAbout(tenantId);
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
// export const updateAboutController = async (req, res) => {
//   try {
//     const tenantId = req.user.tenantId;
//     const abouts = await updateAbout(req.params.id, tenantId, req.body);
//     return res.status(200).json(abouts);
//   } catch (error) {
//     console.log("🚀 ~ updateAboutController ~ error:", error);
//     return res.status(500).json({ error: error.message });
//   }
// };
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
