import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import type { Provider } from '../../types';
import { ERC20_ABI, numberOfTokens } from '../../helpers';

const getErc20Contract = (provider: Provider, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC20_ABI, provider);
};

const getErc20ContractSigner = (signer: ethers.Signer, contractAddress: string) => {
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

export const erc20TotalSupply = async (provider: Provider, contractAddress: string) => {
  const contract = getErc20Contract(provider, contractAddress);

  try {
    const totalSupply = (await contract.totalSupply()) as BigNumber;
    return formatUnits(totalSupply);
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
    const balance = (await contract.balanceOf(targetAddress)) as BigNumber;
    return formatUnits(balance);
  } catch {
    return;
  }
};

type Option = {
  decimals?: number;
  maxFeePerGas?: ethers.BigNumber;
  maxPriorityFeePerGas?: ethers.BigNumber;
};

export const erc20Transfer = async (
  signer: ethers.Signer,
  contractAddress: string,
  toAddress: string,
  amount: number,
  option?: Option,
) => {
  const contract = getErc20ContractSigner(signer, contractAddress);
  const decimals = option ? option.decimals : undefined;
  try {
    const tx = await contract.transfer(toAddress, numberOfTokens(amount, decimals), { ...option });
    return tx;
  } catch {
    return;
  }
};
