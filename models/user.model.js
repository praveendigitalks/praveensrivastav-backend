import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  roleName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  contact_no: {
    type: number,
    require: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

export default mongoose.Schema("User", userschema)
