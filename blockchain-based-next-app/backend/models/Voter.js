const mongoose = require('mongoose');

// Update the schema to be consistent with your database
const VoterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  // Choose one approach:
  // EITHER: Keep using voterID but drop and recreate the index
  voterID: {  // Use uppercase 'ID' consistently
    type: String,
    required: true,
    unique: true
  },
  // OR: Change to match the existing database index
  // voterId: {  // lowercase 'd' to match existing database index
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  walletAddress: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  votedFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate'
  },
  dateRegistered: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Voter', VoterSchema);