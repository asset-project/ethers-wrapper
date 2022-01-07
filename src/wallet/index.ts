import { ethers } from 'ethers';

export const createWallet = async () => {
  return ethers.Wallet.createRandom();
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
