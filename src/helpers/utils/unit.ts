import { ethers } from 'ethers';

export const formatGasPrice = (gasPrice: number) => {
  return ethers.utils.parseUnits(String(gasPrice), 'gwei');
};

export const numberOfTokens = (amount: number, decimals = 18) => {
  return ethers.utils.parseUnits(String(amount), decimals);
};
