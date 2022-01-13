import {
  erc20Name,
  erc20Symbol,
  erc20Decimals,
  erc20TotalSupply,
  erc20Balance,
  erc20Transfer,
} from './erc20';
import {
  erc721Name,
  erc721Symbol,
  erc721TotalSupply,
  erc721BalanceOf,
  erc721OwnerOf,
  erc721TokenURI,
} from './erc721';

export const contracts = {
  ERC20: {
    name: erc20Name,
    symbol: erc20Symbol,
    decimals: erc20Decimals,
    totalSupply: erc20TotalSupply,
    balance: erc20Balance,
    transfer: erc20Transfer,
  },
  ERC721: {
    name: erc721Name,
    symbol: erc721Symbol,
    totalSupply: erc721TotalSupply,
    balanceOf: erc721BalanceOf,
    ownerOf: erc721OwnerOf,
    tokenURI: erc721TokenURI,
  },
};
