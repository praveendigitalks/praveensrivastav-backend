import About from "../models/about.model.js";

export const createAbout = async (tenantId,data) => {
  return await About.create({
    ...data,      // 🔥 spread fields at root
    tenantId
  });
};

export const getAbout = async (tenantId) => {
  return await About.find({ tenantId:tenantId });
};

export const getAboutById = async (id) => {
  return await About.findById({ id,tenantId});
};

export const updateAbout = async (id,tenantId,data) => {
  return await About.findByIdAndUpdate({id,tenantId, data});
};

export const deleteAbout = async (id,tenantId) => {
  return await About.findOneAndDelete({id,tenantId});
};
