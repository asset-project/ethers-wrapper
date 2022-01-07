import { ethers } from 'ethers';
import type { TxnType1Params, TxnType2Params } from '../types';

export const txType1 = ({ from, to, nonce, value, gasLimit, gasPrice, data }: TxnType1Params) => {
  const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
    from,
    to,
    nonce,
    value: value ? ethers.utils.parseUnits(value, 'gwei') : undefined,
    gasLimit,
    gasPrice: gasPrice ? ethers.utils.parseUnits(gasPrice, 'gwei') : undefined,
    data,
  };

  return tx;
};

export const txType2 = ({
  from,
  to,
  nonce,
  value,
  gasLimit,
  maxFeePerGas,
  maxPriorityFeePerGas,
  data,
}: TxnType2Params) => {
  const tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> = {
    from,
    to,
    nonce,
    value: value ? ethers.utils.parseUnits(value, 'gwei') : undefined,
    gasLimit,
    maxFeePerGas: maxFeePerGas ? ethers.utils.parseUnits(maxFeePerGas, 'gwei') : undefined,
    maxPriorityFeePerGas: maxPriorityFeePerGas
      ? ethers.utils.parseUnits(maxPriorityFeePerGas, 'gwei')
      : undefined,
    data,
  };

  return tx;
};
