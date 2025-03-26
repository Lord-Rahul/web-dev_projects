const { body, validationResult } = require('express-validator');

const validateVoterRegistration = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('address').notEmpty().withMessage('Address is required'),
];

const validateAdminLogin = [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

const validateCandidateAddition = [
    body('name').notEmpty().withMessage('Candidate name is required'),
    body('partyName').notEmpty().withMessage('Party name is required'),
    body('logo').notEmpty().withMessage('Logo URL is required'),
    body('photo').notEmpty().withMessage('Photo URL is required'),
];

const validateVote = [
    body('voterId').notEmpty().withMessage('Voter ID is required'),
    body('candidateId').notEmpty().withMessage('Candidate ID is required'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateVoterRegistration,
    validateAdminLogin,
    validateCandidateAddition,
    validateVote,
    validateRequest,
};