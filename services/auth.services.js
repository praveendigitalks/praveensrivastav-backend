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

export const Login = async ({ userName, password, deviceId, deviceInfo }) => {

  const user = await User.findOne({ userName }).populate({
    path: "role",
    populate: "permission",
  });

  if (!user) throw new Error("User Not Found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid Credentials");

  const existingDevice = user.devices.find(
    (d) => d.deviceId === deviceId
  );

  const token = generateJsonWebToken({
    _id: user._id,
    deviceId,
  });

  if (!existingDevice) {
    if (user.devices.length >= 3) {
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
    user,
    devices: user.devices, // 👈 return to frontend
  };
};

export const Logout = async ({ userId, deviceId }) => {
  console.log("🚀 ~ Logout ~ userId:", userId)
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


