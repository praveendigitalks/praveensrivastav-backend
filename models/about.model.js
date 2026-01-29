import mongoose from "mongoose";
import { type } from "os";

const skillSchema = new mongoose.Schema({
  technology: {
    type: String,
    trim: true,
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const priorSkillSchema = new mongoose.Schema({
  skillName: { type: String, trim: true },
  icon: { type: String, trim: true },
  iconType: {
    type: String,
    enum: ["fontawesome", "image"],
    default: "fontawesome",
  },
});

const companyProjects = new mongoose.Schema({
  projectTitle: {
    type: String,
  },
  projectBio: {
    type: String,
  },
  projectDescription: {
    type: String,
  },
  technologies: [
    {
      icon: { type: String, trim: true },
      iconType: {
        type: String,
        enum: ["fontawesome", "image"],
        default: "fontawesome",
      },
    },
  ],
});

const aboutSchema = new mongoose.Schema({
  position: { type: String, required: true },
  description: String,
  dob: { type: Date, required: true },
  phone: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String },
  country: { type: String },
  degree: { type: String, required: true },
  email: { type: String, required: true },
  image: String,
  webskills: {
    type: [skillSchema],
    default: [],
  },
  totalProject: {
    type: Number,
  },
  MeanStack: {
    type: Number,
  },
  MernornextStack: {
    type: Number,
  },
  otherproject: {
    type: Number,
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
  },
});

aboutSchema.add({
  priorskills: [priorSkillSchema],
  companyProjects: [companyProjects],
});

export default mongoose.model("About", aboutSchema);
