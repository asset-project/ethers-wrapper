import { ethers } from 'ethers';
import { Provider } from '../types';

export const createWallet = async () => {
  return ethers.Wallet.createRandom();
};

export const getWalletFromMnemonic = (mnemonic: string) => {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    return wallet;
  } catch {
    return;
  }
};

export const getWallet = (privateKey: string) => {
  try {
    const wallet = new ethers.Wallet(privateKey);
    return wallet;
  } catch {
    return;
  }
};

export const createHDWalletFromMnemonic = async (mnemonic: string) => {
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
    return;
  }

  try {
    const hdnode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    // eslint-disable-next-line quotes
    const hdWallet = hdnode.derivePath("m/44'/60'/0'/0");

    return hdWallet;
  } catch {
    return;
  }
};

export const getWalletSigner = (wallet: ethers.Wallet, provider: Provider) => {
  const walletSigner = wallet.connect(provider);
  return walletSigner;
};
