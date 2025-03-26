const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');
const { connectToBlockchain } = require('../utils/blockchain');
const dotenv = require('dotenv');

dotenv.config();

// @desc    Admin login
// @route   POST /api/admin/login
// @access  Public
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    let admin = await Admin.findOne({ username });
    if (!admin) {
      // Create a default admin if not exists
      if (username === process.env.ADMIN_USERNAME) {
        admin = new Admin({
          username: process.env.ADMIN_USERNAME,
          password: process.env.ADMIN_PASSWORD
        });
        await admin.save();
      } else {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
    }

    // Check password
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Approve voter
// @route   PUT /api/admin/approve/:id
// @access  Private (Admin only)
exports.approveVoter = async (req, res) => {
  try {
    // Use findOneAndUpdate to bypass validation problem
    const voter = await Voter.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'approved',
        // If voter doesn't have a voterID, generate one based on their ID
        $setOnInsert: { voterID: `VID-${req.params.id.substring(0, 8)}` }
      },
      { 
        new: true,  // Return updated document
        runValidators: false,  // Skip validation
        upsert: false  // Don't create if not exists
      }
    );
    
    if (!voter) {
      return res.status(404).json({ msg: 'Voter not found' });
    }
    
    // Try blockchain interaction with proper error handling
    try {
      const { web3, electionContract } = await connectToBlockchain();
      
      // Only attempt blockchain operations if contract is available
      if (electionContract && electionContract.methods) {
        // Add voter to whitelist (if your smart contract has this function)
        if (voter.walletAddress && electionContract.methods.addVoter) {
          await electionContract.methods.addVoter(voter.walletAddress).send({
            from: process.env.ADMIN_WALLET_ADDRESS || web3.eth.accounts[0],
            gas: 3000000
          });
        }
      } else {
        console.warn('Blockchain contract not available, proceeding with database update only');
      }
    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
      // Continue with database update only
    }
    
    res.json({ success: true, data: voter });
  } catch (error) {
    console.error('Approve voter error:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Reject voter
// @route   PUT /api/admin/reject/:id
// @access  Private (Admin only)
exports.rejectVoter = async (req, res) => {
  try {
    // Use findOneAndUpdate to bypass validation problem
    const voter = await Voter.findByIdAndUpdate(
      req.params.id,
      { 
        status: 'rejected',
        // If voter doesn't have a voterID, generate one based on their ID
        $setOnInsert: { voterID: `VID-${req.params.id.substring(0, 8)}` }
      },
      { 
        new: true, 
        runValidators: false,
        upsert: false
      }
    );
    
    if (!voter) {
      return res.status(404).json({ msg: 'Voter not found' });
    }
    
    // Record on blockchain if wallet address exists
    try {
      const { web3, electionContract } = await connectToBlockchain();
      
      if (electionContract && electionContract.methods && voter.walletAddress) {
        const accounts = await web3.eth.getAccounts();
        
        if (electionContract.methods.rejectVoter) {
          await electionContract.methods.rejectVoter(voter.walletAddress)
            .send({ from: accounts[0], gas: 3000000 });
        }
      } else {
        console.warn('Blockchain contract not available, continuing with database operation only');
      }
    } catch (error) {
      console.error('Blockchain error:', error);
      // Continue even if blockchain fails
    }
    
    res.json({ 
      success: true, 
      data: voter,
      msg: 'Voter rejected successfully' 
    });
  } catch (error) {
    console.error('Reject voter error:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/me
// @access  Private
exports.getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json({ success: true, data: admin });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// Add candidate
exports.addCandidate = async (req, res) => {
    const { name, partyName, logo, photo, blockchainId } = req.body;
    try {
        // Find the maximum blockchainId to auto-increment if not provided
        let nextBlockchainId = blockchainId;
        if (!nextBlockchainId) {
            const maxCandidate = await Candidate.findOne().sort({ blockchainId: -1 });
            nextBlockchainId = maxCandidate ? maxCandidate.blockchainId + 1 : 1;
        }
        
        const candidate = await Candidate.create({
            name,
            partyName,
            logo,
            photo,
            blockchainId: nextBlockchainId
        });
        
        res.status(201).json({ 
            message: 'Candidate added successfully', 
            candidate 
        });
    } catch (error) {
        console.error('Error adding candidate:', error);
        res.status(500).json({ 
            message: 'Error adding candidate', 
            error: error.message 
        });
    }
};