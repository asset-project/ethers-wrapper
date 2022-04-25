import { BigNumber, ethers } from 'ethers';
import type { Provider, TransactionFeeOptions } from '../../types';
import { ERC721_ABI } from '../../helpers';

const getErc721Contract = (provider: Provider, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC721_ABI, provider);
};

const getErc721ContractSigner = (signer: ethers.Signer, contractAddress: string) => {
  return new ethers.Contract(contractAddress, ERC721_ABI, signer);
};

// Methods
export const erc721Name = async (provider: Provider, contractAddress: string) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const tokenName = await contract.name();
    return tokenName as string;
  } catch {
    return;
  }
};

export const erc721Symbol = async (provider: Provider, contractAddress: string) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const tokenSymbol = await contract.symbol();
    return tokenSymbol as string;
  } catch {
    return;
  }
};

export const erc721TotalSupply = async (provider: Provider, contractAddress: string) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const totalSupply = (await contract.totalSupply()) as BigNumber;
    return totalSupply.toNumber();
  } catch {
    return;
  }
};

export const erc721BalanceOf = async (
  provider: Provider,
  contractAddress: string,
  targetAddress: string,
) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const balanceOf = (await contract.balanceOf(targetAddress)) as BigNumber;
    return balanceOf.toNumber();
  } catch {
    return;
  }
};

export const erc721OwnerOf = async (
  provider: Provider,
  contractAddress: string,
  tokenId: number,
) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const ownerOf = await contract.ownerOf(tokenId);
    return ownerOf as string;
  } catch {
    return;
  }
};

export const erc721TokenURI = async (
  provider: Provider,
  contractAddress: string,
  tokenId: number,
) => {
  const contract = getErc721Contract(provider, contractAddress);

  try {
    const tokenURI = await contract.tokenURI(tokenId);
    return tokenURI as string;
  } catch {
    return;
  }
};

export const erc721TransferFrom = async (
  signer: ethers.Signer,
  contractAddress: string,
  toAddress: string,
  tokenId: number,
  option?: TransactionFeeOptions,
) => {
  const contract = getErc721ContractSigner(signer, contractAddress);

  try {
    const address = await signer.getAddress();
    const tx = await contract.transferFrom(address, toAddress, tokenId, { ...option });
    return tx;
  } catch {
    return;
  }
};
