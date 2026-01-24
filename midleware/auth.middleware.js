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
    console.log("i am in middleware")
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("🚀 ~ protect ~ !user:", !user)
      return res.status(401).json({ message: "User not found" });
    }

    // ⛔ DO NOT block logout if device token missing
    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

