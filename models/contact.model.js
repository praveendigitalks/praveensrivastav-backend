import mongoose from "mongoose";

const socialprofileSchema = new mongoose.Schema({
  social_link: { type: String, trim: true },
  icon: { type: String, trim: true },
  iconType: {
    type: String,
    enum: ["fontawesome", "image"],
    default: "fontawesome",
  },
});
const contactScehma = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  phone_no :  {
    type : String
  },
  address :  {
    type : String
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
}, { timestamps: true });


contactScehma.add({
  socialprofileSchema: [socialprofileSchema],
});

export default mongoose.model("Contact", contactScehma);
