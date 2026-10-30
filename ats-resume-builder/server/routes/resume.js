const router = require('express').Router();
const Resume = require('../models/Resume');
const auth = require('../middleware/auth');

// All routes below require authentication
router.use(auth);

// @route   POST /api/resumes
// @desc    Create a new resume
router.post('/', async (req, res, next) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user.id });
    res.status(201).json(resume);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/resumes
// @desc    Get all resumes of logged-in user
router.get('/', async (req, res, next) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort('-updatedAt');
    res.json(resumes);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/resumes/:id
// @desc    Get a single resume (owner only)
router.get('/:id', async (req, res, next) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/resumes/:id
// @desc    Update a resume (owner only)
router.put('/:id', async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume (owner only)
router.delete('/:id', async (req, res, next) => {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
