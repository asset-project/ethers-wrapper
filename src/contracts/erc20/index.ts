import {
  erc20Name,
  erc20Symbol,
  erc20Decimals,
  erc20TotalSupply,
  erc20Balance,
  erc20Transfer,
  erc20TransferEstimateGas,
  erc20CallStaticTransfer,
  erc20TokenData,
} from './methods';

export const ERC20 = {
  name: erc20Name,
  symbol: erc20Symbol,
  decimals: erc20Decimals,
  totalSupply: erc20TotalSupply,
  balance: erc20Balance,
  token: erc20TokenData,
  transfer: erc20Transfer,
  transferEstimateGas: erc20TransferEstimateGas,
  callStaticTransfer: erc20CallStaticTransfer,
};
