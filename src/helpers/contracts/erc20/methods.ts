import { ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils';
import type { Provider } from '../../../types';
import { ERC20_ABI } from '../../abis/erc20';

const getErc20Contract = (provider: Provider, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, provider);
};

const getErc20ContractSigner = (
  signer: ethers.providers.JsonRpcSigner,
  contractAddress: string,
) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, signer);
};

// Methods
export const erc20Name = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    const tokenName = await contract.name();
    return tokenName as string;
  } catch {
    return;
  }
};

export const erc20Symbol = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    const tokenSymbol = await contract.symbol();
    return tokenSymbol as string;
  } catch {
    return;
  }
};

export const erc20Decimals = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    const decimals = await contract.decimals();
    return decimals as number;
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
    const balance = await contract.balanceOf(targetAddress);
    return formatUnits(balance);
  } catch {
    return;
  }
};

export const erc20TotalSupply = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    const totalSupply = await contract.totalSupply();
    return totalSupply as number;
  } catch {
    return;
  }
};

export const erc20Transfer = async (
  signer: ethers.providers.JsonRpcSigner,
  contractAddress: string,
  toAddress: string,
  amount: number,
) => {
  const contract = getErc20ContractSigner(signer, contractAddress);

  try {
    const tx = await contract.transfer(toAddress, parseUnits(String(amount)));
    const result = await tx.wait();
    return result;
  } catch {
    return;
  }
};
