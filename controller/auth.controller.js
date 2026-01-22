import { Login } from "../services/auth.services.js";

export const LoginUser = async (req, res) => {
  try {
    console.log(req.body, "controller body request")
    const login = await Login(req.body);
    return res.status(201).json(login);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
