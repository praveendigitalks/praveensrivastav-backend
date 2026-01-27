// import User from "./../models/user.model.js";
// import { comparePassword } from "./../utils/password.js";
// import { generateJsonWebToken } from "./../utils/jwt.js";

// export const Login = async ({ userName, password }) => {
//   console.log(userName, password, "services body request");

//   const user = await User.findOne({ userName }).populate({
//     path: "role",
//     populate: "permission",
//   });

//   if (!user) throw new Error("User Not Found");
//   const match = await comparePassword(password, user.password);
//   if (!match) throw new Error("Invalid Credentials");

//   return {
//     token: generateJsonWebToken(user),
//     user,
//   };
// };
import User from "./../models/user.model.js";
import { comparePassword } from "./../utils/password.js";
import { generateJsonWebToken } from "./../utils/jwt.js";
import Tenant from "./../models/tenant.model.js";

// old architectrure without SaaS based 

// export const Login = async ({ userName, password, deviceId, deviceInfo }) => {

//   const user = await User.findOne({ userName }).populate({
//     path: "role",
//     populate: "permission",
//   });

//   if (!user) throw new Error("User Not Found");

//   const match = await comparePassword(password, user.password);
//   if (!match) throw new Error("Invalid Credentials");

//   const existingDevice = user.devices.find(
//     (d) => d.deviceId === deviceId
//   );

//   const token = generateJsonWebToken({
//     _id: user._id,
//     deviceId,
//   });

//   if (!existingDevice) {
//     if (user.devices.length >= 3) {
//       throw new Error("Maximum 3 devices allowed");
//     } 

//     user.devices.push({
//       deviceId,
//       deviceName: deviceInfo.deviceName,
//       browser: deviceInfo.browser,
//       os: deviceInfo.os,
//       deviceType: deviceInfo.deviceType,
//       userAgent: deviceInfo.userAgent,
//       token,
//       lastLogin: new Date(),
//     });
//   } else {
//     existingDevice.token = token;
//     existingDevice.lastLogin = new Date();
//   }

//   await user.save();

//   return {
//     token,
//     user,
//     devices: user.devices, // 👈 return to frontend
//   };
// };


// new architectrure without SaaS based 

export const Login = async ({ userName, password, deviceId, deviceInfo }) => {

  const user = await User.findOne({ userName }).populate({
    path: "role",
    populate: "permission",
  });

  if (!user) throw new Error("User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  /* ---------------- SUPER ADMIN BYPASS ---------------- */
  if (!user.isSuperAdmin) {
    if (!user.tenantId) {
      throw new Error("Tenant not assigned");
    }

    const tenant = await Tenant.findById(user.tenantId);

    if (!tenant || !tenant.isActive) {
      throw new Error("Tenant is disabled");
    }

    if (tenant.Subscription.status !== "ACTIVE") {
      throw new Error("Subscription inactive");
    }
  }

  /* ---------------- DEVICE MANAGEMENT ---------------- */
  const existingDevice = user.devices.find(
    d => d.deviceId === deviceId
  );

  const token = generateJsonWebToken(user);

  if (!existingDevice) {
    if (!user.isSuperAdmin && user.devices.length >= 3) {
      throw new Error("Maximum 3 devices allowed");
    }

    user.devices.push({
      deviceId,
      deviceName: deviceInfo.deviceName,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      deviceType: deviceInfo.deviceType,
      userAgent: deviceInfo.userAgent,
      token,
      lastLogin: new Date(),
    });
  } else {
    existingDevice.token = token;
    existingDevice.lastLogin = new Date();
  }

  await user.save();

  return {
    token,
    user: {
      _id: user._id,
      userName: user.userName,
      isSuperAdmin: user.isSuperAdmin,
      tenantId: user.tenantId,
      role: user.role
    },
    devices: user.isSuperAdmin ? [] : user.devices
  };
};

// export const Logout = async ({ userId, deviceId }) => {
//   console.log("🚀 ~ Logout ~ userId:", userId)
//   const user = await User.findById(userId);
//   if (!user) throw new Error("User not found");

//   const before = user.devices.length;

//   user.devices = user.devices.filter(
//     d => d.deviceId !== deviceId
//   );

//   if (before === user.devices.length) {
//     throw new Error("Device already logged out");
//   }

//   await user.save();
// };


export const Logout = async ({ userId, deviceId }) => {

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const before = user.devices.length;

  user.devices = user.devices.filter(
    d => d.deviceId !== deviceId
  );

  if (before === user.devices.length) {
    throw new Error("Device already logged out");
  }

  await user.save();
};
