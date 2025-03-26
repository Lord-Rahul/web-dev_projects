const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  loginAdmin,
  approveVoter,
  rejectVoter,
  getAdminProfile
} = require('../controllers/adminController');

// @route   POST /api/admin/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', loginAdmin);

// @route   GET /api/admin/me
// @desc    Get admin profile
// @access  Private
router.get('/me', auth, getAdminProfile);

// @route   PUT /api/admin/approve/:id
// @desc    Approve voter
// @access  Private (Admin only)
router.put('/approve/:id', auth, approveVoter);

// @route   PUT /api/admin/reject/:id
// @desc    Reject voter
// @access  Private (Admin only)
router.put('/reject/:id', auth, rejectVoter);

module.exports = router;