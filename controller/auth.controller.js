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

// export const LogoutUser = async (req, res) => {
//   try {
//     console.log("i am in controller came out of the protect now")
//     const { userId,deviceId } = req.body;
//     console.log("🚀 ~ LogoutUser ~ req.body:", req.body)

//     if (!deviceId) {
//       return res.status(400).json({ message: "DeviceId required" });
//     }

//     await Logout({
//       userId,   // ✅ FIX
//       deviceId,
//     });

//     return res.status(200).json({
//       message: "Logged out from this device",
//     });
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };



export const LogoutUser = async (req, res) => {
  try {
    const deviceId = req.body.deviceId;

    if (!deviceId) {
      return res.status(400).json({ message: "DeviceId required" });
    }

    await Logout({
      userId: req.user._id,   // 🔐 from protect middleware
      deviceId,
    });

    return res.status(200).json({
      message: "Logged out from this device",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
