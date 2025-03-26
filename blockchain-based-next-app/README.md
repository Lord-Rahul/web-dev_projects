# Voting Blockchain App

## Overview
The Voting Blockchain App is a decentralized voting system built using Next.js for the frontend and Node.js with Express for the backend. This application leverages blockchain technology to ensure secure and transparent voting processes. It allows for voter registration, candidate management, and real-time voting results, all while maintaining a robust authentication system for admin users.

## Features
- **Voter Registration**: Voters can register and submit their details for approval.
- **Admin Actions**: Admins can log in, approve or reject voter registrations, and add election candidates.
- **Voting Process**: Approved voters can cast their votes, ensuring each voter can only vote once.
- **Real-time Results**: Voting results are updated continuously and can be fetched at any time.
- **Blockchain Integration**: All data related to voters, candidates, and votes are stored on the blockchain for transparency and security.

## Technologies Used
- **Frontend**: Next.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Blockchain**: Truffle, Ganache GUI

## Project Structure
```
voting-blockchain-app
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── truffle
│   ├── utils
│   ├── app.js
│   ├── package.json
│   └── server.js
├── frontend
│   ├── components
│   ├── pages
│   ├── public
│   ├── styles
│   ├── next.config.js
│   └── package.json
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- Truffle
- Ganache GUI

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd voting-blockchain-app
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application
1. Start the MongoDB server.
2. Start the Ganache GUI for local blockchain testing.
3. Deploy the smart contracts:
   ```
   cd backend/truffle
   truffle migrate
   ```

4. Start the backend server:
   ```
   cd ../..
   cd backend
   node server.js
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm run dev
   ```

### API Endpoints
- **Voter Registration**: `POST /api/register`
- **Admin Login**: `POST /api/admin/login`
- **Approve Voter**: `POST /api/admin/approve`
- **Reject Voter**: `POST /api/admin/reject`
- **Add Candidate**: `POST /api/admin/add-candidate`
- **Vote**: `POST /api/vote`
- **Get Results**: `GET /api/results`

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.