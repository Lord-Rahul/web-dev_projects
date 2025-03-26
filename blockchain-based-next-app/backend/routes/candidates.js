const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addCandidate,
  getCandidates,
  getCandidateById
} = require('../controllers/candidateController');
const fileUpload = require('express-fileupload');

// Setup file upload middleware for this route
router.use(fileUpload());

// @route   POST /api/candidates
// @desc    Add a new candidate
// @access  Private (Admin only)
router.post('/', auth, addCandidate);

// @route   GET /api/candidates
// @desc    Get all candidates
// @access  Public
router.get('/', getCandidates);

// @route   GET /api/candidates/:id
// @desc    Get candidate by ID
// @access  Public
router.get('/:id', getCandidateById);

module.exports = router;