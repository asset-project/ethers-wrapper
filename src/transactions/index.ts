import { ethers } from 'ethers';
import { txType1, txType2 } from '../helpers';
import type { TransactionParams } from '../types';

export const ethSendTransaction = async (
  wallet: ethers.Wallet,
  transactionParams: TransactionParams,
) => {
  let tx: ethers.utils.Deferrable<ethers.providers.TransactionRequest> | null = null;

  if (transactionParams.type === 'type1') {
    tx = txType1(transactionParams);
  } else if (transactionParams.type === 'type2') {
    tx = txType2(transactionParams);
  } else {
    return false;
  }

  if (!tx) {
    return false;
  }

  const result = await wallet.sendTransaction(tx);
  return result;
};
