import type { ethers } from 'ethers';

export type ContractMethodOption = {
  decimals?: number;
  maxFeePerGas?: ethers.BigNumber;
  maxPriorityFeePerGas?: ethers.BigNumber;
};
