import Contact from "../models/contact.model.js";

export const createContact = async(tenantId,data) =>{
    return Contact.create({tenantId,data});
};
export const getContact = async(tenantId) =>{
    return Contact.find({tenantId});
}
export const getByIdContact = async(id,tenantId) =>{
    return Contact.findById({id,tenantId});
}
export const updateContact = async(id,tenantId,data) =>{
    return Contact.findByIdAndUpdate({id,tenantId,data});
}
export const deleteContact = async(id,tenantId) =>{
    return Contact.findByIdAndDelete({id,tenantId});
}