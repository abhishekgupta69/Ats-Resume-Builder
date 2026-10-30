const router = require('express').Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');
const { analyzeResume, resumeToText } = require('../utils/atsScore');

// @route   POST /api/ats/score
// @desc    Score a resume against a job description
// @body    { jobDescription, resumeId? | resumeText? }
router.post('/score', auth, async (req, res, next) => {
  try {
    const { jobDescription, resumeId, resumeText } = req.body;

    if (!jobDescription || jobDescription.trim().length < 50) {
      return res
        .status(400)
        .json({ message: 'Please paste a full job description (at least 50 characters).' });
    }

    let text = (resumeText || '').trim();

    if (resumeId) {
      const resume = await Resume.findOne({ _id: resumeId, user: req.user.id });
      if (!resume) return res.status(404).json({ message: 'Resume not found' });
      text = resumeToText(resume);
    }

    if (!text || text.length < 50) {
      return res
        .status(400)
        .json({ message: 'Select one of your saved resumes or paste resume text.' });
    }

    res.json(analyzeResume(text, jobDescription));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
