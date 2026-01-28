import crypto from "crypto";

export const generatePassword = () =>
  crypto.randomBytes(6).toString("hex");

export const generateUsername = (tenantName) =>
  tenantName.toLowerCase().replace(/\s+/g, "") + "_admin";
