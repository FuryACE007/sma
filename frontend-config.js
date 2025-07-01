/**
 * Frontend Configuration for Smart Portfolio Management System
 *
 * This file provides configuration for connecting the frontend to the Sepolia testnet
 * via MetaMask wallet integration.
 */

// Sepolia Chain Configuration
const SEPOLIA_CHAIN_CONFIG = {
  chainId: "0xaa36a7", // 11155111 in hex
  chainName: "Sepolia Testnet",
  nativeCurrency: {
    name: "Sepolia ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY"],
  blockExplorerUrls: ["https://sepolia.etherscan.io/"],
};

// Contract ABIs will be loaded from the backend
const API_BASE_URL = "http://localhost:3001/api";

/**
 * Connect to MetaMask and switch to Sepolia network
 * @returns {Promise<string>} The connected wallet address
 */
async function connectWallet() {
  if (!window.ethereum) {
    throw new Error(
      "MetaMask is not installed. Please install MetaMask to use this application."
    );
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Switch to Sepolia network
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_CONFIG.chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [SEPOLIA_CHAIN_CONFIG],
          });
        } catch (addError) {
          throw new Error("Failed to add Sepolia network to MetaMask");
        }
      } else {
        throw new Error("Failed to switch to Sepolia network");
      }
    }

    return accounts[0];
  } catch (error) {
    console.error("Error connecting to MetaMask", error);
    throw error;
  }
}

/**
 * Get contract addresses from the backend
 * @returns {Promise<Object>} Contract addresses
 */
async function getContractAddresses() {
  try {
    const response = await fetch(`${API_BASE_URL}/contracts/addresses`);
    if (!response.ok) {
      throw new Error("Failed to fetch contract addresses");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching contract addresses", error);
    throw error;
  }
}

/**
 * Initialize ethers provider and contracts
 * @param {string} address User's wallet address
 * @returns {Promise<Object>} Initialized contracts
 */
async function initializeContracts(address) {
  const contractAddresses = await getContractAddresses();

  // This would be implemented based on your frontend framework (React, Vue, etc.)
  // Example implementation would use ethers.js to connect to contracts

  return {
    modelPortfolioManager: contractAddresses.modelPortfolioManager,
    investorPortfolioManager: contractAddresses.investorPortfolioManager,
    cashToken: contractAddresses.cashToken,
    realEstateToken: contractAddresses.realEstateToken,
    privateEquityToken: contractAddresses.privateEquityToken,
  };
}

export {
  connectWallet,
  getContractAddresses,
  initializeContracts,
  SEPOLIA_CHAIN_CONFIG,
};
