// import jwt from "jsonwebtoken";
// export const protect = (req, res, next) => {
//   const token = req.headers.authorization.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "Now JWT Token Found" });
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = decoded;

//   next();
// };

import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 🔐 device-token validation
    const validDevice = user.devices.find(
      (d) => d.token === token
    );

    if (!validDevice) {
      return res.status(401).json({
        message: "Session expired or logged out from this device",
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

