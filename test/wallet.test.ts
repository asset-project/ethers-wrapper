import dotEnv from 'dotenv';
import {
  createHDWalletFromMnemonic,
  createWallet,
  getProvider,
  getInfuraProvider,
  getWallet,
  getWalletFromMnemonic,
  getWalletProvider,
  getWalletSigner,
} from '../src';
import type { Provider } from '../src/types';

let provider: Provider | null = null;

beforeAll(() => {
  dotEnv.config();

  provider = getProvider(process.env.TESTNET_JSON_RPC_URL) as Provider;
});

describe('Test wallet', () => {
  // Provider
  it('Test the getProvider function.', async () => {
    const provider = getProvider(process.env.TESTNET_JSON_RPC_URL);
    expect(provider).toBeDefined();

    const blockNumber = await provider.getBlockNumber();
    expect(blockNumber).toBeGreaterThan(1000000);
  });

  it('Test getInfuraProvider function.', async () => {
    const provider = getInfuraProvider(
      'homestead',
      process.env.INFURA_PROJECT_ID,
      process.env.INFURA_PROJECT_SECRET,
    );
    expect(provider).toBeDefined();

    const blockNumber = await provider.getBlockNumber();
    expect(blockNumber).toBeGreaterThan(1000000);
  });

  it('Test the getWalletProvider function.', async () => {
    const wallet = getWalletProvider(process.env.PRIVATE_KEY, process.env.TESTNET_JSON_RPC_URL);
    expect(wallet).toBeDefined();

    const chainId = await wallet.getChainId();
    expect(chainId).toBe(3);
  });

  it('Test the createWallet function.', async () => {
    const wallet = createWallet();
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();
  });

  it('Test the getWalletFromMnemonic function.', async () => {
    const wallet = getWalletFromMnemonic(process.env.MNEMONIC);
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();

    const errorWallet = getWalletFromMnemonic('abc');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the getWallet function.', async () => {
    const wallet = getWallet(process.env.PRIVATE_KEY);
    expect(wallet).toBeDefined();

    const address = await wallet.getAddress();
    expect(address).toBeDefined();

    const errorWallet = getWallet('0x111');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the createHDWalletFromMnemonic function.', async () => {
    const wallet = createHDWalletFromMnemonic(process.env.MNEMONIC);
    expect(wallet).toBeDefined();
    expect(wallet.address).toBeDefined();

    const errorWallet = createHDWalletFromMnemonic('abc');
    expect(errorWallet).toBeUndefined();
  });

  it('Test the getWalletSigner', async () => {
    const wallet = getWalletFromMnemonic(process.env.MNEMONIC);
    const walletSigner = getWalletSigner(wallet, provider);
    expect(walletSigner).toBeDefined();
  });
});
