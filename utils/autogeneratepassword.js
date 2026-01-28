import crypto from "crypto";

export const generatePassword = () =>
  crypto.randomBytes(6).toString("hex");

export const generateUsername = (tenantName) =>
  tenantName.replace(/\s+/g, "")
  .toLowerCase() + "_admin";


// const userName = `${tenantName
//   .replace(/\s+/g, "")
//   .toLowerCase()}_${tenantId.toString().slice(-4)}_admin`;
