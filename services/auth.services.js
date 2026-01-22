import User from "./../models/user.model.js";
import { comparePassword } from "./../utils/password.js";
import { generateJsonWebToken } from "./../utils/jwt.js";

export const Login = async ({ userName, password }) => {
  console.log(userName, password, "services body request");

  const user = await User.findOne({ userName }).populate({
    path: "role",
    populate: "permission",
  });

  if (!user) throw new Error("User Not Found");
  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid Credentials");

  return {
    token: generateJsonWebToken(user),
    user,
  };
};
