# Smart Portfolio Management System

This repository contains the complete Smart Portfolio Management System with both backend and smart contract components, deployed on the Sepolia testnet.

## Structure

- `sma-backend/`: Backend service built with Node.js and Express
- `sma-contracts/`: Smart contracts built with Solidity and deployed on Sepolia testnet

## Getting Started

1. Clone the repository with submodules:

```bash
git clone --recursive https://github.com/FuryACE007/sma.git
```

2. Deploy contracts to Sepolia:

```bash
cd sma-contracts
npm install
npm run deploy:sepolia
```

3. Start the backend server:

```bash
cd ../sma-backend
npm install
npm run dev
```

## Sepolia Testnet

This project uses the Sepolia Ethereum testnet. You'll need:

- MetaMask wallet configured for Sepolia testnet
- Sepolia ETH from a faucet (e.g., https://sepoliafaucet.com/)
- Alchemy or Infura API key for Sepolia RPC access

## Environment Variables

### Smart Contracts (.env)

```
PRIVATE_KEY=your_deployer_private_key
BUILD_BEAR_RPC_URL=https://rpc.buildbear.io/your_buildbear_endpoint
PORTFOLIO_MANAGER_KEY=your_portfolio_manager_private_key
```

### Backend (.env)

```
PORT=3001
NODE_ENV=development
PRIVATE_KEY=your_portfolio_manager_private_key
BUILD_BEAR_RPC_URL=https://rpc.buildbear.io/your_buildbear_endpoint
MODEL_PORTFOLIO_MANAGER_ADDRESS=deployed_contract_address
INVESTOR_PORTFOLIO_MANAGER_ADDRESS=deployed_contract_address
CASH_TOKEN_ADDRESS=deployed_contract_address
REAL_ESTATE_TOKEN_ADDRESS=deployed_contract_address
PRIVATE_EQUITY_TOKEN_ADDRESS=deployed_contract_address
```

> Note: After deploying to Sepolia, the contract addresses will be automatically updated in the backend's deployment.json file.
