import mongoose from "mongoose";
const portfolioSchema = new mongoose.Schema({
  projectName: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  category: {
    type: String,
  },
  projectImage: {
    type: String,
  },
  projectUrl: {
    type: String,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
});

export default mongoose.model("Portfolio", portfolioSchema);
