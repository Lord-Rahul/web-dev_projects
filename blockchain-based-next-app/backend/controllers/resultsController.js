const Result = require('../models/Result');
const blockchainUtils = require('../utils/blockchain');
const Candidate = require('../models/Candidate');
const Voter = require('../models/Voter');
const { connectToBlockchain } = require('../utils/blockchain');

// @desc    Get voting results
// @route   GET /api/results
// @access  Public
exports.getResults = async (req, res) => {
  try {
    // Get results from database
    const candidates = await Candidate.find().sort({ voteCount: -1 });
    const totalVoters = await Voter.countDocuments();
    const votedVoters = await Voter.countDocuments({ hasVoted: true });
    
    // Calculate statistics
    const voterTurnout = totalVoters > 0 ? (votedVoters / totalVoters) * 100 : 0;
    
    let blockchainResults = [];
    
    // Try to get results from blockchain - with proper error handling
    try {
      const { web3, electionContract } = await connectToBlockchain();
      
      // Only attempt blockchain operations if contract is available
      if (electionContract && electionContract.methods) {
        const candidateCount = await electionContract.methods.candidatesCount().call();
        
        // Get candidates from blockchain
        for (let i = 1; i <= candidateCount; i++) {
          const candidate = await electionContract.methods.candidates(i).call();
          blockchainResults.push({
            id: candidate.id,
            name: candidate.name,
            voteCount: candidate.voteCount
          });
        }
      } else {
        console.warn('Blockchain contract not available, proceeding with database results only');
      }
    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
      // Continue with database results only
    }
    
    res.json({
      success: true,
      data: {
        candidates,
        stats: {
          totalVoters,
          votedVoters,
          voterTurnout: voterTurnout.toFixed(2)
        },
        blockchainResults: blockchainResults.length > 0 ? blockchainResults : null
      }
    });
  } catch (error) {
    console.error('Get results error:', error);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Sync blockchain and database results
// @route   POST /api/results/sync
// @access  Private (Admin only)
exports.syncResults = async (req, res) => {
  try {
    const { web3, electionInstance } = await connectToBlockchain();
    const candidateCount = await electionInstance.methods.candidatesCount().call();
    
    // Get all blockchain candidates
    const blockchainCandidates = [];
    for (let i = 1; i <= candidateCount; i++) {
      const candidate = await electionInstance.methods.candidates(i).call();
      blockchainCandidates.push({
        id: parseInt(candidate.id),
        name: candidate.name,
        party: candidate.party,
        voteCount: parseInt(candidate.voteCount)
      });
    }
    
    // Update MongoDB with blockchain data
    for (const bcCandidate of blockchainCandidates) {
      const dbCandidate = await Candidate.findOne({ 
        name: bcCandidate.name, 
        partyName: bcCandidate.party 
      });
      
      if (dbCandidate) {
        dbCandidate.voteCount = bcCandidate.voteCount;
        await dbCandidate.save();
      }
    }
    
    res.json({ 
      success: true, 
      msg: 'Database synchronized with blockchain successfully' 
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};