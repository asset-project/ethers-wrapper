import {
  erc721Name,
  erc721Symbol,
  erc721TotalSupply,
  erc721BalanceOf,
  erc721OwnerOf,
  erc721TokenURI,
  erc721TransferFrom,
} from './methods';

export const ERC721 = {
  name: erc721Name,
  symbol: erc721Symbol,
  totalSupply: erc721TotalSupply,
  balanceOf: erc721BalanceOf,
  ownerOf: erc721OwnerOf,
  tokenURI: erc721TokenURI,
  transferFrom: erc721TransferFrom,
};
