const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  partyName: {  // This is the correct field name we want to use
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'Candidate'
  },
  logo: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  },
  blockchainId: {
    type: Number,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);

