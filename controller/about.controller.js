import {
  createAbout,
  getAbout,
  getAboutById,
  updateAbout,
  deleteAbout,
} from "../services/about.services.js";

export const createAboutController = async (req, res) => {
  try {
    const abouts =await createAbout(req.body);
    console.log("🚀 ~ createAboutController ~ abouts:", abouts)
    return res.status(201).json(abouts);
  } catch (error) {
    return res.status(500).json({error : error.message});
  }
};
export const getAboutController = async (req, res) => {
  try {
    const abouts = await getAbout();
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ getAboutController ~ error:", error);
    return res.status(500).json({error : error.message});
  }
};
export const getAboutControllerbyId = async (req, res) => {
  try {
    const abouts = await getAboutById(req.params.id);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ getAboutControllerbyId ~ error:", error);
    return res.status(500).json({error : error.message});
  }
};
export const updateAboutController = async (req, res) => {
  try {
    const abouts =await createAbout(req.params.id, req.body);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ updateAboutController ~ error:", error);
    return res.status(500).json({error : error.message}); 
  }
};
export const deleteAboutController = async (req, res) => {
  try {
    const abouts = await deleteAbout(req.params.id);
    return res.status(200).json(abouts);
  } catch (error) {
    console.log("🚀 ~ deleteAboutController ~ error:", error);
    return res.status(500).json({error : error.message});
  }
};
