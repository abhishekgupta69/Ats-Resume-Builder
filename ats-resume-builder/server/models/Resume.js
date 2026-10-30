const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    start: String,
    end: String,
    description: String,
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    year: String,
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'Untitled Resume', trim: true },
    template: { type: String, enum: ['modern', 'classic'], default: 'modern' },
    personalInfo: {
      fullName: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      summary: { type: String, default: '' },
    },
    skills: [{ type: String }],
    experience: [experienceSchema],
    education: [educationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
