import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  contact_no: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
});

export default mongoose.model("User", userschema);
