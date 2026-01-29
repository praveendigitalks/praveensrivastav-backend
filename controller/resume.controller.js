import { createResume, getResume, getResumeByid, updateResume, deleteResume } from "../services/resume.services.js";

export const createResumeController = async (req, res) => {

    try {
        const tenantId = req.user.tenantId;
        const resume = await createResume(tenantId, req.data);
        return res.status(201).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
export const getResumeController = async (req, res) => {

    try {
        const tenantId = req.user.tenantId;
        const resume = await getResume(tenantId);
        return res.status(200).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
export const getResumeByidController = async (req, res) => {

    try {
        const tenantId = req.user.tenantId;
        const resume = await getResumeByid(req.params.id,tenantId);
        return res.status(200).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
export const updateResumeController = async (req, res) => {

    try {
        const tenantId = req.user.tenantId;
        const resume = await updateResume(req.params.id,tenantId);
        return res.status(200).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
export const deleteResumeController = async (req, res) => {

    try {
        const tenantId = req.user.tenantId;
        const resume = await deleteResume( req.params.id,tenantId);
        return res.status(200).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}
