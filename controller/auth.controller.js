// import { Login } from "../services/auth.services.js";

// export const LoginUser = async (req, res) => {
//   try {
//     console.log(req.body, "controller body request")
//     const login = await Login(req.body);
//     return res.status(201).json(login);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// };
import { Login, Logout } from "../services/auth.services.js";

export const LoginUser = async (req, res) => {
  try {
    const login = await Login(req.body);
    return res.status(200).json(login);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ message: "DeviceId required" });
    }

    await Logout({
      userId: req.user.id,
      deviceId,
    });

    return res.status(200).json({
      message: "Logged out from this device",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


