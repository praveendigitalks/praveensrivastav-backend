import {
  createPortfolio,
  getByIdPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../services/portfolio.services.js";

export const createController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const portfolio = await createPortfolio(tenantId, req.body);
    return res.status(201).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const portfolio = await getPortfolio(tenantId);
    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const getByIdController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const portfolio = await getByIdPortfolio(req.params.id,tenantId);
    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const portfolio = await updatePortfolio(req.params.id,tenantId, req.body);
    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const deleteController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const portfolio = await deletePortfolio(req.params.id,tenantId);
    return res.status(200).json(portfolio);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
