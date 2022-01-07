import { ethers, providers, Wallet } from 'ethers';

export const getProvider = (jsonRpcUrl: string) => {
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
  return provider;
};

export const getInfuraProvider = (
  network = 'homestead',
  projectId: string,
  projectSecret: string,
) => {
  const provider = new ethers.providers.InfuraProvider(network, {
    projectId,
    projectSecret,
  });

  return provider;
};

export const getWalletProvider = (privateKey: string, jsonRpcUrl: string) => {
  const wallet = new Wallet(privateKey, new providers.JsonRpcProvider(jsonRpcUrl));
  return wallet;
};
