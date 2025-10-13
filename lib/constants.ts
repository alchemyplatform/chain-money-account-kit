/**
 * Network and contract constants for the application
 */

// Chain configuration
export const CHAIN_ID = "0x14a34"; // Base Sepolia (84532)
export const CHAIN_ID_NUMBER = 84532;

// Network name
export const NETWORK_NAME = "Base Sepolia";

// RPC URL (for server-side use with API key)
export const getRpcUrl = (apiKey: string) =>
  `https://base-sepolia.g.alchemy.com/v2/${apiKey}`;

// Token contracts
export const USDC_CONTRACT_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
export const AUSDC_CONTRACT_ADDRESS = "0xf53B60F4006cab2b3C4688ce41fD5362427A2A66";

// AAVE v3 contracts
export const AAVE_V3_POOL_ADDRESS = "0x07eA79F68B2B3df564D0A34F8e19D9B1e339814b";

// Block explorer
export const BLOCK_EXPLORER_URL = "https://sepolia.basescan.org";

// AAVE market UI
export const AAVE_MARKET_URL = "https://bridge-testnet.aave.com/markets/?marketName=proto_base_sepolia_v3";

// AAVE documentation
export const AAVE_DOCS_URL = "https://aave.com";
