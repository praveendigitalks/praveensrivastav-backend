import Portfolio from "../models/portfolio.model.js";

export const createPortfolio = async(tenantId,data) =>{
    return Portfolio.create({tenantId,...data});
};
export const getPortfolio = async(tenantId) =>{
    return Portfolio.find({tenantId});
};
export const getByIdPortfolio = async(id,tenantId) =>{
    return Portfolio.findById({_id: id,tenantId});
};
export const updatePortfolio = async(id,tenantId,data) =>{
    return Portfolio.findOneAndUpdate( { _id: id, tenantId },
    { $set: data },
    { new: true });
};
export const deletePortfolio = async(id,tenantId) =>{
    return Portfolio.findByIdAndDelete({id,tenantId});
};


/** 1) Get all unique categories (no duplicates) for tenant */
// service
export const getCategories = async (tenantId) => {
  // returns array of strings, e.g. ["Angular Projects", "Node JS Projects", ...]
  return Portfolio.distinct('category', { tenantId });
};


/** 2) Get projects by category for tenant */
export const getProjectsByCategory = async (tenantId, category) => {
  return Portfolio.find({
    tenantId,
    category,
  });
};