import { ethers } from 'ethers';
import { txType2 } from '../helpers';
import type { TransactionParams } from '../types';

export const ethSendTransaction = async (
  wallet: ethers.Wallet,
  transactionParams: TransactionParams,
): Promise<ethers.providers.TransactionResponse | false> => {
  const tx = txType2({ ...transactionParams, type: 'type2' });
  const result = await wallet.sendTransaction(tx);

  return result;
};
