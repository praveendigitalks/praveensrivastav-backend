import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    tenantName: {
      type: String,
      required: true,
    },

    tenantPhoneNo: String,

    subscription: {
      status: {
        type: String,
        enum: ["TRIAL", "ACTIVE", "EXPIRED", "CANCELLED"],
        default: "TRIAL",
      },
      expiresAt: {
        type: Date, 
        required: true,
      },
    },  
    isActive: {
      type: Boolean,
      default: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model("Tenant", tenantSchema);
