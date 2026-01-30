import mongoose from "mongoose";
const educationSchema = new mongoose.Schema([
  {
    degreeName: {
      type: String,
    },
    start_year: {
      type: Date,
    },
    end_year: {
      type: Date,
    },
    institueName: {
      type: String,
    },
    percentorcgpa: {
      type: String,
    },
  },
]);
const professionSchema = new mongoose.Schema([
  {
    positionName: {
      type: String,
    },
    start_year: {
      type: Date,
    },
    end_year: {
      type: Date,
    },
    experience: {
      type: String,
    },
    professiondescription: [
      {
        type: String,
      },
    ],
  },
]);

const resumeSchema = new mongoose.Schema({
  profileName: {
    type: String,
  },
  carrerOverview: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
  },

  education: {
    type: [educationSchema],
    default: [],
  },
  profession: {
    type: [professionSchema],
    default: [],
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
});

export default mongoose.model("Resume", resumeSchema);
