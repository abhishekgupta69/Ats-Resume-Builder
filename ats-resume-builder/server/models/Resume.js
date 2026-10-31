const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  duration: String,
  bullets: [String]
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree: String,
  school: String,
  year: String
}, { _id: false });

const projectSchema = new mongoose.Schema({
  name: String,
  links: String,
  bullets: [String]
}, { _id: false });

const skillsSchema = new mongoose.Schema({
  languages: String,
  frontend: String,
  backend: String,
  database: String,
  tools: String
}, { _id: false });

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, default: '' },
  title: { type: String, default: 'Untitled Resume' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  github: { type: String, default: '' },
  summary: { type: String, default: '' },
  experience: [experienceSchema],
  education: [educationSchema],
  projects: [projectSchema],
  skills: skillsSchema,
  certifications: [String]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);