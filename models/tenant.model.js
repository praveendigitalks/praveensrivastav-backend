import mongoose from "mongoose";

const tenantScehma = new mongoose.Schema(
  {
    tenantName: {
      type: String,
    },
    tenantAge: {
      type: String,
    },
    tenantDob: {
      type: String,
    },
    tenantPhoneno: {
      type: String,
    },

    Subscription: {
      status: {
        type: String,
        enum: ["TRIAL", "ACTIVE", "Expired", "CANCELLED"],
      },

      expiresAt: Date,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Tenant", tenantScehma);
