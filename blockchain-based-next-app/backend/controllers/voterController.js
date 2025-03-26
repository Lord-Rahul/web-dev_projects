const Voter = require('../models/Voter');
const Candidate = require('../models/Candidate');
const blockchain = require('../utils/blockchain');

// @desc    Register a new voter
// @route   POST /api/voters/register
// @access  Public
exports.registerVoter = async (req, res) => {
  try {
    const { name, email, address, voterID, walletAddress } = req.body;
    
    // Create voter in database
    const voter = new Voter({
      name,
      email,
      address,
      voterID,
      walletAddress
    });
    
    await voter.save();
    
    // Register on blockchain if wallet address is provided
    if (walletAddress) {
      try {
        await blockchain.registerVoterOnBlockchain(walletAddress);
        console.log('Voter registered on blockchain');
      } catch (blockchainError) {
        console.error('Blockchain registration error:', blockchainError);
        // Continue with response as voter is recorded in database
      }
    }
    
    res.status(201).json({ success: true, data: voter });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all voters
// @route   GET /api/voters
// @access  Private (Admin only)
exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find().sort({ dateRegistered: -1 });
    res.json({ success: true, data: voters });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Get voter by ID
// @route   GET /api/voters/:id
// @access  Private
exports.getVoterById = async (req, res) => {
  try {
    // Check if the id is a MongoDB ObjectId or a voter ID string
    const isObjectId = req.params.id.match(/^[0-9a-fA-F]{24}$/);
    
    let voter;
    if (isObjectId) {
      // If it's a valid ObjectId, search by _id
      voter = await Voter.findById(req.params.id);
    } else {
      // Otherwise, search by voterID field
      voter = await Voter.findOne({ voterID: req.params.id });
    }

    if (!voter) {
      return res.status(404).json({ msg: 'Voter not found' });
    }

    res.json({ success: true, data: voter });
  } catch (error) {
    console.error('Get voter error:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Submit a vote
// @route   POST /api/voters/vote
// @access  Private
exports.submitVote = async (req, res) => {
  try {
    const { voterID, candidateId } = req.body;
    
    // Find voter by voterID string
    const voter = await Voter.findOne({ voterID });
    
    if (!voter) {
      return res.status(404).json({ msg: 'Voter not found with this ID' });
    }
    
    // Find the candidate
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }
    
    // Record vote in database
    voter.hasVoted = true;
    voter.votedFor = candidateId;
    await voter.save();
    
    // Increment candidate vote count
    candidate.voteCount += 1;
    await candidate.save();
    
    // For blockchain, use a numeric ID (candidate index) instead of MongoDB ObjectId
    if (voter.walletAddress) {
      try {
        // Get blockchain candidates first to verify the ID
        const blockchainCandidates = await blockchain.getCandidatesFromBlockchain();
        console.log('Available blockchain candidates:', blockchainCandidates);
        
        // Use the correct blockchain ID - either from the stored mapping or find by name
        let blockchainCandidateId;
        
        // If we have a stored blockchain ID, use that
        if (candidate.blockchainId) {
          blockchainCandidateId = candidate.blockchainId;
        } else {
          // Otherwise find by name from our retrieved list
          const matchingCandidate = blockchainCandidates.find(c => 
            c.name.toLowerCase() === candidate.name.toLowerCase());
          
          if (matchingCandidate) {
            blockchainCandidateId = matchingCandidate.id;
            // Store for future use
            candidate.blockchainId = blockchainCandidateId;
            await candidate.save();
          } else {
            throw new Error('Candidate not found on blockchain');
          }
        }
        
        console.log(`Using blockchain candidate ID: ${blockchainCandidateId}`);
        
        // Get connected components
        const { web3, electionContract } = await blockchain.connectToBlockchain();
        
        // Only proceed if we have a valid contract and ID
        if (electionContract && electionContract.methods && blockchainCandidateId) {
          await electionContract.methods.vote(Number(blockchainCandidateId)).send({ 
            from: voter.walletAddress,
            gas: 3000000 
          });
          
          console.log('Vote recorded on blockchain successfully');
        } else {
          console.warn('Blockchain contract not available, vote recorded only in database');
        }
      } catch (blockchainError) {
        console.error('Blockchain voting error:', blockchainError);
        // Continue with response as vote is recorded in database
      }
    }
    
    res.json({ 
      success: true,
      msg: 'Your vote has been recorded successfully'
    });
  } catch (error) {
    console.error('Vote submission error:', error);
    res.status(500).json({ msg: 'Server error during vote submission' });
  }
};