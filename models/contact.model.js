import mongoose from "mongoose";

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
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
});

export default mongoose.model("Contact", contactScehma);
