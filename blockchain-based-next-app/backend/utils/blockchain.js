const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Keep just one export approach - use this object for all exports
const blockchain = {
  // Connect to blockchain and get contract instances
  connectToBlockchain: async () => {
    try {
      // Connect to the blockchain network
      const web3 = new Web3(process.env.BLOCKCHAIN_URL);
      
      // Get contract data
      const contractPath = path.join(__dirname, '../truffle/build/contracts/Election.json');
      const contractJson = JSON.parse(fs.readFileSync(contractPath, 'utf8'));
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = contractJson.networks[networkId];
      
      if (!deployedNetwork) {
        throw new Error(`Contract not deployed on network ID: ${networkId}`);
      }
      
      // Create contract instance
      const contractAddress = deployedNetwork.address;
      const electionContract = new web3.eth.Contract(
        contractJson.abi,
        contractAddress
      );
      
      console.log('Connected to blockchain, contract address:', contractAddress);
      
      // Get accounts with error handling
      let accounts = [];
      try {
        accounts = await web3.eth.getAccounts();
        console.log('Available accounts:', accounts.length > 0 ? accounts : 'None');
      } catch (accountError) {
        console.error('Failed to get accounts:', accountError.message);
      }
      
      return { web3, electionContract, accounts };
    } catch (error) {
      console.error('Blockchain connection error:', error);
      throw error; // Re-throw the error to handle it in calling code
    }
  },

  // Register a voter on the blockchain
  registerVoterOnBlockchain: async (walletAddress) => {
    try {
      console.log('Registering voter on blockchain with wallet:', walletAddress);
      
      // Connect to blockchain
      const { web3, electionContract, accounts } = await blockchain.connectToBlockchain();
      
      if (!electionContract || !electionContract.methods) {
        throw new Error('Contract not properly initialized');
      }
      
      // Get the admin account from Ganache (usually the first account)
      // Make sure Ganache is running and this account has ETH
      let fromAccount;
      
      // Check if accounts array is populated from Ganache
      if (accounts && accounts.length > 0) {
        console.log('Using admin account for transaction:', accounts[0]);
        fromAccount = accounts[0];
      } else {
        // Fallback to the voter's own wallet address
        console.log('No admin accounts available, using voter wallet address');
        fromAccount = walletAddress;
      }
      
      // Log transaction details before sending
      console.log('Transaction details:', {
        method: 'registerVoter',
        params: [walletAddress],
        from: fromAccount,
        gas: '3000000'
      });
      
      // Execute the transaction
      const result = await electionContract.methods.registerVoter(walletAddress)
        .send({ 
          from: fromAccount, 
          gas: '3000000' // Increased gas limit
        });
      
      console.log('Voter registration transaction hash:', result.transactionHash);
      return result;
    } catch (error) {
      console.error('Error in registerVoterOnBlockchain:', error);
      throw error;
    }
  },

  // Add a candidate to the blockchain
  addCandidateToBlockchain: async (name, party) => {
    try {
      console.log('Adding candidate to blockchain:', name, party);
      
      const { web3, electionContract, accounts } = await blockchain.connectToBlockchain();
      
      // Check if we have admin accounts
      if (!accounts || accounts.length === 0) {
        throw new Error('No admin accounts available for adding candidate');
      }
      
      // Call the smart contract function to add candidate
      const result = await electionContract.methods.addCandidate(name, party)
        .send({ from: accounts[0], gas: '1000000' });
      
      console.log('Candidate addition transaction:', result.transactionHash);
      return result;
    } catch (error) {
      console.error('Error adding candidate to blockchain:', error);
      throw error;
    }
  },

  // Add this new function to list candidates on the blockchain
  getCandidatesFromBlockchain: async () => {
    try {
      console.log('Retrieving candidates from blockchain');
      
      const { web3, electionContract } = await blockchain.connectToBlockchain();
      
      // Get the number of candidates
      const candidateCount = await electionContract.methods.candidatesCount().call();
      console.log(`Found ${candidateCount} candidates on blockchain`);
      
      // Get details for each candidate
      const candidates = [];
      for (let i = 1; i <= candidateCount; i++) {
        const candidate = await electionContract.methods.candidates(i).call();
        candidates.push({
          id: Number(candidate.id),
          name: candidate.name,
          party: candidate.party,
          voteCount: Number(candidate.voteCount)
        });
        console.log(`Candidate ${i}: ${candidate.name}, ID: ${candidate.id}`);
      }
      
      return candidates;
    } catch (error) {
      console.error('Error retrieving candidates from blockchain:', error);
      throw error;
    }
  }
  
  // ... you can add all the other functions here using the same pattern
};

module.exports = blockchain;