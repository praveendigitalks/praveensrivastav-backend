import {
  activateTenant,
  deactivateTenant,
} from "../services/subscription.services.js";

export const ActivateTenant = async (req, res) => {
  try {
    const subscription = await activateTenant(req.params.id);
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
