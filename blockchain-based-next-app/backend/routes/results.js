const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getResults,
  syncResults
} = require('../controllers/resultsController');

// @route   GET /api/results
// @desc    Get voting results
// @access  Public
router.get('/', getResults);

// @route   POST /api/results/sync
// @desc    Sync blockchain and database results
// @access  Private (Admin only)
router.post('/sync', auth, syncResults);

module.exports = router;