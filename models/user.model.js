  // import mongoose from "mongoose";

  // const userschema = new mongoose.Schema({
  //   userName: {
  //     type: String,
  //     require: true,
  //   },
  //   age: {
  //     type: Number,
  //     require: true,
  //   },
  //   contact_no: {
  //     type: Number,
  //     require: true,
  //   },
  //   password: {
  //     type: String,
  //     require: true,
  //   },
  //   role: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Role",
  //   },
  // });

  // export default mongoose.model("User", userschema);
import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  deviceId: String,
  deviceName: String,
  browser: String,
  os: String,
  deviceType: String,
  userAgent: String,
  token: String,
  lastLogin: Date,
});

const userschema = new mongoose.Schema({
  userName: { type: String, required: true },
  age: Number,
  contact_no: Number,
  password: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  devices: {
    type: [deviceSchema],
    default: [],
  },
});

export default mongoose.model("User", userschema);

