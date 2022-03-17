import { ethers } from 'ethers';
import type { Provider } from '../types';

export const createWallet = () => {
  return ethers.Wallet.createRandom();
};

export const getWalletFromMnemonic = (mnemonic: string) => {
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
    return;
  }

  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return wallet;
};

export const getWallet = (privateKey: string) => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
  } catch {
    return;
  }
};

export const createHDWalletFromMnemonic = (mnemonic: string, index = 0) => {
  if (!ethers.utils.isValidMnemonic(mnemonic)) return;

  const hdnode = ethers.utils.HDNode.fromMnemonic(mnemonic);
  const hdWallet = hdnode.derivePath(`m/44'/60'/0'/${index}`);
  return hdWallet;
};

export const getWalletSigner = (wallet: ethers.Wallet, provider: Provider) => {
  const walletSigner = wallet.connect(provider);
  return walletSigner;
};
