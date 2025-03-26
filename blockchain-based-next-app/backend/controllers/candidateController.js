const Candidate = require('../models/Candidate');
const blockchain = require('../utils/blockchain'); // Fix this import
const path = require('path');
const fs = require('fs');

// @desc    Add a new candidate
// @route   POST /api/candidates
// @access  Private (Admin only)
exports.addCandidate = async (req, res) => {
  try {
    // Debug the entire request to see what's coming in
    console.log('Request body:', req.body);
    console.log('Request files:', req.files ? Object.keys(req.files) : 'No files');
    
    // Get form fields - check both body and possibly nested in files
    const name = req.body.name;
    
    // Extract party without defaulting to Independent
    let partyValue = null;
    
    // Check for party value in common field names
    if (req.body.party && req.body.party.trim() !== '') {
      partyValue = req.body.party;
    } else if (req.body.partyName && req.body.partyName.trim() !== '') {
      partyValue = req.body.partyName;
    }
    
    // Validate required fields - party is now required explicitly
    if (!name) {
      return res.status(400).json({ success: false, msg: 'Name is required' });
    }
    
    if (!partyValue || partyValue.trim() === '') {
      return res.status(400).json({ success: false, msg: 'Party name is required' });
    }
    
    console.log('Party value to be used:', partyValue);
    
    // Handle image upload if present
    let photoPath = '';
    let logoPath = '';
    
    if (req.files) {
      if (req.files.photo) {
        const photo = req.files.photo;
        photoPath = `/uploads/candidates/${Date.now()}_${photo.name}`;
        
        // Create directory if it doesn't exist
        const uploadDir = path.join(__dirname, '../public/uploads/candidates');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Move the file
        photo.mv(path.join(uploadDir, path.basename(photoPath)));
      }
      
      if (req.files.logo) {
        const logo = req.files.logo;
        logoPath = `/uploads/logos/${Date.now()}_${logo.name}`;
        
        // Create directory if it doesn't exist
        const uploadDir = path.join(__dirname, '../public/uploads/logos');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        // Move the file
        logo.mv(path.join(uploadDir, path.basename(logoPath)));
      }
    }

    // Update candidateData object with the correct field name - no defaults for party
    const candidateData = {
      name: name,
      partyName: partyValue,
      position: req.body.position || 'Candidate',
      photo: photoPath || 'default-photo.jpg',
      logo: logoPath || 'default-logo.png',
      voteCount: 0
    };
    
    console.log('Creating candidate with data:', candidateData);
    
    // Create and save the candidate
    const candidate = new Candidate(candidateData);
    const savedCandidate = await candidate.save();
    
    // Add to blockchain now that DB save succeeded
    try {
      await blockchain.addCandidateToBlockchain(name, partyValue);
      console.log('Candidate added to blockchain');
    } catch (blockchainError) {
      console.error('Blockchain error:', blockchainError);
    }
    
    res.status(201).json({ success: true, data: savedCandidate });
  } catch (error) {
    console.error('Add candidate error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Public
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find().sort({ dateAdded: -1 });
    res.json({ success: true, data: candidates });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

// @desc    Get candidate by ID
// @route   GET /api/candidates/:id
// @access  Public
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    
    if (!candidate) {
      return res.status(404).json({ msg: 'Candidate not found' });
    }

    res.json({ success: true, data: candidate });
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Candidate not found' });
    }
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};