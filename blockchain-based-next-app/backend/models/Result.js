const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    votes: {
        type: Number,
        default: 0
    },
    electionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Result', ResultSchema);