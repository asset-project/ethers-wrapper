import { ethers, providers, Wallet } from 'ethers';

export const getProvider = (jsonRpcUrl: string) => {
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
  return provider;
};

export const getWalletProvider = (privateKey: string, jsonRpcUrl: string) => {
  const wallet = new Wallet(privateKey, new providers.JsonRpcProvider(jsonRpcUrl));
  return wallet;
};
