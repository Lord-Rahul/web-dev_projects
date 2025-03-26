const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  registerVoter,
  getVoters,
  getVoterById,
  submitVote
} = require('../controllers/voterController');

// @route   POST /api/voters/register
// @desc    Register a new voter
// @access  Public
router.post('/register', registerVoter);

// @route   GET /api/voters
// @desc    Get all voters
// @access  Private (Admin only)
router.get('/', auth, getVoters);

// @route   GET /api/voters/:id
// @desc    Get voter by ID
// @access  Private
router.get('/:id', auth, getVoterById);

// @route   POST /api/voters/vote
// @desc    Submit a vote
// @access  Private
router.post('/vote', auth, submitVote);

module.exports = router;