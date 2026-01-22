import { hasPassword } from "../utils/password.js";
import User from "../models/user.model.js";

export const createUser = async (data) => {
  data.password = await hasPassword(data.password);
  return User.create(data);
};

export const getUser = async () => {
  return User.find()
    .populate("role")
    .populate({
      path: "role",
      populate: { path: "permission" },
    });
};

export const getUserbyId = async (id) => {
  return User.findById(id).populate("role role.permission");
};

export const updateUser = async (id, data) => {
  return User.findByIdAndUpdate(id, data);
};

export const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};
