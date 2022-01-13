import dotEnv from 'dotenv';
import {
  createHDWalletFromMnemonic,
  createWallet,
  getProvider,
  getWallet,
  getWalletFromMnemonic,
  getWalletSigner,
} from '../src';
import type { Provider } from '../src/types';

let privateKey = '';
let mnemonic = '';
let provider: Provider | null = null;

beforeAll(() => {
  dotEnv.config();

  privateKey = process.env.PRIVATE_KEY;
  mnemonic = process.env.MNEMONIC;
  provider = getProvider(process.env.JSON_RPC_URL) as Provider;
});

describe('Test wallet', () => {
  it('Test the createWallet function.', async () => {
    const wallet = createWallet();
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();
  });

  it('Test the getWalletFromMnemonic function.', async () => {
    const wallet = getWalletFromMnemonic(mnemonic);
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();

    const errorWallet = getWalletFromMnemonic('abc');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the getWallet function.', async () => {
    const wallet = getWallet(privateKey);
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();

    const errorWallet = getWallet('0x111');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the createHDWalletFromMnemonic function.', async () => {
    const wallet = createHDWalletFromMnemonic(mnemonic);
    expect(wallet).toBeDefined();
    expect(wallet.address).toBeDefined();

    const errorWallet = createHDWalletFromMnemonic('abc');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the getWalletSigner', async () => {
    const wallet = getWalletFromMnemonic(mnemonic);
    const walletSigner = getWalletSigner(wallet, provider);
    expect(walletSigner).toBeDefined();
  });
});
