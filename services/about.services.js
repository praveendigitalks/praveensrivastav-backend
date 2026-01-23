import About from "../models/about.model.js";

export const createAbout = async (data) => {
  return await About.create(data);
};

export const getAbout = async () => {
  return await About.find();
};

export const getAboutById = async (id) => {
  return await About.findById(id);
};

export const updateAbout = async (id, data) => {
  return await About.findByIdAndUpdate(id, data);
};

export const deleteAbout = async (id) => {
  return await About.findOneAndDelete(id);
};
