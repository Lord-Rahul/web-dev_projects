// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        string party;
        uint voteCount;
    }

    // Model a Voter
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedCandidateId;
    }

    // Store accounts that have voted
    mapping(address => Voter) public voters;
    
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    
    // Store Candidates Count
    uint public candidatesCount;

    // Events
    event VoterRegistered(address voterAddress);
    event CandidateAdded(uint candidateId, string name, string party);
    event VoteCast(address voter, uint candidateId);

    // Store admin address
    address public admin;
    
    constructor() {
        admin = msg.sender;
    }
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    // Register Voter
    function registerVoter(address _voterAddress) public {
        require(!voters[_voterAddress].isRegistered, "Voter already registered");
        
        voters[_voterAddress].isRegistered = true;
        voters[_voterAddress].hasVoted = false;
        
        emit VoterRegistered(_voterAddress);
    }

    // Add Candidate
    function addCandidate(string memory _name, string memory _party) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, 0);
        emit CandidateAdded(candidatesCount, _name, _party);
    }

    // Vote
    function vote(uint _candidateId) public {
        // Require that voter is registered
        require(voters[msg.sender].isRegistered, "Voter is not registered");
        
        // Require that voter hasn't voted before
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        
        // Require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");
        
        // Record that voter has voted
        voters[msg.sender].hasVoted = true;
        voters[msg.sender].votedCandidateId = _candidateId;
        
        // Update candidate vote count
        candidates[_candidateId].voteCount++;
        
        emit VoteCast(msg.sender, _candidateId);
    }
}