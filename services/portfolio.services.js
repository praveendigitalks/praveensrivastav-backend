import Portfolio from "../models/portfolio.model.js";

export const createPortfolio = async(tenantId,data) =>{
    return Portfolio.create({tenantId,data});
};
export const getPortfolio = async(tenantId) =>{
    return Portfolio.find({tenantId});
};
export const getByIdPortfolio = async(id,tenantId) =>{
    return Portfolio.findById({id,tenantId});
};
export const updatePortfolio = async(id,tenantId,data) =>{
    return Portfolio.findByIdAndUpdate({id,tenantId,data});
};
export const deletePortfolio = async(id,tenantId) =>{
    return Portfolio.findByIdAndDelete({id,tenantId});
};