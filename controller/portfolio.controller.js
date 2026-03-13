import {
  createPortfolio,
  getByIdPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
  getCategories,
  getProjectsByCategory
} from "../services/portfolio.services.js";

export const createController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;

     const data = {
      ...req.body,
      projectImage: req.file ? `/upload/portfolio/${req.file.filename}` : null,
    };
    const portfolio = await createPortfolio(tenantId, data);
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


/** 1) GET /sp/portfolio/categories  -> unique categories */
export const getCategoriesController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const categories = await getCategories(tenantId);
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/** 2) GET /sp/portfolio/category/:category -> projects by category */
export const getByCategoryController = async (req, res) => {
  try {
    const tenantId = req.user.tenantId;
    const category = req.params.category;
    const projects = await getProjectsByCategory(tenantId, category);
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};