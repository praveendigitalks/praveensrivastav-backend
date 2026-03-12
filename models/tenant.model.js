import mongoose from "mongoose";

// const socialprofileSchema = new mongoose.Schema({
//   social_link: { type: String, trim: true },
//   icon: { type: String, trim: true },
//   iconType: {
//     type: String,
//     enum: ["fontawesome", "image"],
//     default: "fontawesome",
//   },
// });

const tenantSchema = new mongoose.Schema(
  {
    tenantName: {
      type: String,
      required: true,
    },

    tenantPhoneNo: String,
    heroImage: String,
    bio: String,

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
      planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubscriptionPlan",
      },
      client_secret: {
        type: String,
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

// tenantSchema.add({
//   socialprofileSchema: [socialprofileSchema],
// });

export default mongoose.model("Tenant", tenantSchema);
