import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  technology: {
    type: String,
    required: true,
    trim: true
  },
  proficiency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
});

const aboutSchema = new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  description: String,

  dob: {
    type: Date,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  degree: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  image: String,

  webskills: {
    type: [skillSchema],
    default: []
  }
});

export default mongoose.model("About", aboutSchema);
