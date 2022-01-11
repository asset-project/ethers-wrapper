import { ethers, utils } from 'ethers';
import { txType1, txType2 } from '../helpers';
import type { Provider, SignTypedData, TransactionParams } from '../types';

export const getSigner = (provider: Provider) => {
  const signer = provider.getSigner();
  return signer;
};

export const personalSign = async (wallet: ethers.Wallet, message: string) => {
  const hex = utils.isHexString(message) ? utils.arrayify(message) : message;
  const result = await wallet.signMessage(hex);
  return result;
};

export const ethSignTransaction = async (
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

  const Tx = await wallet.populateTransaction(tx);
  const result = await wallet.signTransaction(Tx);
  return result;
};

export const ethSignTypedData = async (wallet: ethers.Wallet, signTypedData: SignTypedData) => {
  const { domain, types, value } = signTypedData;

  const result = await wallet._signTypedData(domain, types, value);
  return result;
};
