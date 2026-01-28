import mongoose from "mongoose";

const permissionScehma = new mongoose.Schema({
  module: {
    type: String,
    require: true,
  },
  actions: [{
    type: String,
    enum: ["CREATE", "READ", "UPDATE", "DELETE", "SOFT_DELETE"],
  }],
});

export default mongoose.model("Permission", permissionScehma);
