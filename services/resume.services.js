import Resume from "../models/resume.model.js";


export const createResume = async (tenantId, data) => {
    return await Resume.create({
        ...data,
        tenantId,
    });
};
export const getResume = async (tenantId) => {
    return await Resume.find({ tenantId: tenantId });
};
export const getResumeByid = async (id, tenantId) => {
    return await Resume.findById({ _id: id, tenantId });
};
export const updateResume = async (id, tenantId, data) => {
    return await Resume.findByIdAndUpdate({ _id: id, tenantId, data });
};
export const deleteResume = async (id, tenantId) => {
    return await Resume.findByIdAndDelete({ _id: id, tenantId });
};