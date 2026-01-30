import { createContact , getByIdContact, getContact, updateContact,deleteContact } from "../services/contact.services.js";

export const createController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const contact = await createContact(tenantId, req.body);
    return res.status(201).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const contact = await getContact(tenantId);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getByIdController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const contact = await getByIdContact(req.params.id,tenantId);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const contact = await updateContact(req.params.id,tenantId, req.body);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const contact = await deleteContact(req.params.id,tenantId);
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
