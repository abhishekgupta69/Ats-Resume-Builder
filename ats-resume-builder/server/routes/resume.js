const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

// Save a new resume
router.post('/', auth, async (req, res) => {
  try {
    const {
      fullName, title, email, phone, location, linkedin, github,
      summary, experience, education, projects, skills, certifications
    } = req.body;

    const newResume = new Resume({
      user: req.user.id,
      fullName,
      title: title || 'Untitled Resume',
      email,
      phone,
      location,
      linkedin,
      github,
      summary,
      experience: experience || [],
      education: education || [],
      projects: projects || [],
      skills: skills || {},
      certifications: certifications || []
    });

    const resume = await newResume.save();
    res.status(201).json(resume);
  } catch (err) {
    console.error('Save resume error:', err);
    res.status(500).json({ message: 'Failed to save resume' });
  }
});

// Get all resumes for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
    console.error('Get resumes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific resume by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({ 
      _id: req.params.id,
      user: req.user.id 
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (err) {
    console.error('Get resume error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a resume
router.put('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (err) {
    console.error('Update resume error:', err);
    res.status(500).json({ message: 'Failed to update resume' });
  }
});

// ✅ DELETE a resume
router.delete('/:id', auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    console.error('Delete resume error:', err);
    res.status(500).json({ message: 'Failed to delete resume' });
  }
});

module.exports = router;