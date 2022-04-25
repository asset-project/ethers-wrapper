import { ethers, type BigNumberish } from 'ethers';

export const formatUnits = (amount: BigNumberish, unitName?: BigNumberish) => {
  return ethers.utils.formatUnits(amount, unitName);
};

export const parseGasPrice = (gasPrice: number) => {
  return ethers.utils.parseUnits(String(gasPrice), 'gwei');
};

export const numberOfTokens = (amount: number, decimals = 18) => {
  return ethers.utils.parseUnits(String(amount), decimals);
};
