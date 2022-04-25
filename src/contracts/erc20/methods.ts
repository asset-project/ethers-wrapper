import { ethers, type BigNumber, type Signer } from 'ethers';
import type { TransactionResponse } from '@ethersproject/abstract-provider';
import type { Provider, TransactionFeeOptions } from '../../types';
import { ERC20_ABI } from '../../helpers';

const getErc20Contract = (provider: Provider, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, provider);
};

const getErc20ContractSigner = (signer: Signer, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, signer);
};

// Methods
export const erc20Name = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    return (await contract.name()) as string;
  } catch {
    return;
  }
};

export const erc20Symbol = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    return (await contract.symbol()) as string;
  } catch {
    return;
  }
};

export const erc20Decimals = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    return (await contract.decimals()) as number;
  } catch {
    return;
  }
};

export const erc20TotalSupply = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    return (await contract.totalSupply()) as BigNumber;
  } catch {
    return;
  }
};

export const erc20Balance = async (
  provider: Provider,
  contractAddress: string,
  targetAddress: string,
) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    return (await contract.balanceOf(targetAddress)) as BigNumber;
  } catch {
    return;
  }
};

export const erc20Transfer = async (
  signer: ethers.Signer,
  contractAddress: string,
  to: string,
  amount: BigNumber,
  option?: TransactionFeeOptions,
) => {
  const contract = getErc20ContractSigner(signer, contractAddress);

  try {
    const tx = await contract.transfer(to, amount, option && { ...option });
    return tx as TransactionResponse;
  } catch {
    return;
  }
};

export const erc20TransferEstimateGas = async (
  signer: ethers.Signer,
  contractAddress: string,
  to: string,
  amount: BigNumber,
) => {
  const contract = getErc20ContractSigner(signer, contractAddress);

  try {
    const result = await contract.estimateGas.transfer(to, amount);
    return result as BigNumber;
  } catch {
    return;
  }
};
