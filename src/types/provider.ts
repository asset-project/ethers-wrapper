import type { ethers } from 'ethers';

export type Provider =
  | ethers.providers.JsonRpcProvider
  | ethers.providers.Web3Provider
  | ethers.providers.InfuraProvider;
