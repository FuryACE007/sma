# Migration to Sepolia Testnet

This document outlines the changes made to migrate the Smart Portfolio Management System from a local Hardhat network to the Sepolia testnet.

## Changes Made

### Smart Contracts

1. **Created Sepolia Deployment Script**

   - Added `deploy.ts` script specifically for Sepolia deployment
   - Script handles contract deployment, ownership transfer, and saving deployment information
   - Automatically updates backend with contract addresses and ABIs

2. **Environment Configuration**
   - Updated `.env` files to use BuildBear RPC URLs and private keys
   - Removed hardcoded Hardhat addresses and keys

### Backend

1. **Contract Connection**

   - Updated `contracts/index.ts` to use BuildBear RPC URL from environment variables
   - Added proper error handling for missing environment variables
   - Switched from hardcoded Hardhat wallet to environment-based configuration

2. **API Endpoints**

   - Added new `/api/contracts/addresses` endpoint to expose contract addresses to frontend
   - Updated Swagger documentation to include new endpoints

3. **Documentation**
   - Updated README with Sepolia-specific instructions
   - Removed Hardhat-specific references

### Frontend Support

1. **MetaMask Integration**
   - Created `frontend-config.js` with Sepolia network configuration
   - Added wallet connection and network switching functionality
   - Implemented contract address fetching from backend API

## How to Deploy

1. **Set Up Environment Variables**

   - In `sma-contracts/.env`:
     ```
     PRIVATE_KEY=your_deployer_private_key
     BUILD_BEAR_RPC_URL=https://rpc.buildbear.io/your_buildbear_endpoint
     PORTFOLIO_MANAGER_KEY=your_portfolio_manager_private_key
     ```

2. **Deploy Contracts to Sepolia**

   ```bash
   cd sma-contracts
   npm install
   npm run deploy:sepolia
   ```

3. **Start Backend Server**
   ```bash
   cd sma-backend
   npm install
   npm run dev
   ```

## Connecting with MetaMask

1. **Configure MetaMask for Sepolia**

   - Add Sepolia network to MetaMask if not already added
   - Get test ETH from a Sepolia faucet (e.g., https://sepoliafaucet.com/)

2. **Connect Frontend**
   - Use the provided `frontend-config.js` in your frontend application
   - Implement the `connectWallet()` function to handle MetaMask connection
   - Fetch contract addresses from the backend API

## Testing

1. **Verify Contract Deployment**

   - Check Sepolia Etherscan to verify contracts are deployed correctly
   - Verify contract ownership is transferred to the portfolio manager

2. **Test API Endpoints**
   - Use Swagger UI at `http://localhost:3001/api-docs` to test endpoints
   - Verify contract addresses are correctly returned by the API

## Troubleshooting

1. **Contract Deployment Issues**

   - Ensure you have sufficient Sepolia ETH for gas fees
   - Check that your private keys are correctly set in environment variables
   - Verify your Sepolia RPC URL is valid and has sufficient request capacity

2. **Backend Connection Issues**

   - Ensure the deployment.json file is correctly updated with Sepolia contract addresses
   - Check that your backend .env file has the correct Sepolia RPC URL
   - Verify the backend can connect to the Sepolia network

3. **MetaMask Connection Issues**
   - Ensure MetaMask is installed and unlocked
   - Check that MetaMask is connected to the Sepolia network
   - Verify the user has approved the connection request
