import dotEnv from 'dotenv';
import type { ethers } from 'ethers';
import type { Provider } from '../src/types';
import { contracts, parseGasPrice, getProvider, getWallet, getWalletSigner } from '../src';

let wallet: ethers.Wallet | null = null;
let provider: Provider | null = null;

beforeAll(() => {
  dotEnv.config();

  wallet = getWallet(process.env.PRIVATE_KEY);
  provider = getProvider(process.env.TESTNET_JSON_RPC_URL) as Provider;
});

const MOCK_TOKEN = {
  address: '0x000B33BbcDad4D7a279259424f210b2f88d810e0',
  name: 'Mock Token',
  symbol: 'MT',
  decimals: 18,
};

const NONEXISTENT_TOKEN_ADDRESS = '0x333333333333333333333333333333333333333a';

describe('Test ERC20 methods', () => {
  it('Checking token name', async () => {
    const result = await contracts.ERC20.name(provider, MOCK_TOKEN.address);
    expect(result).toBe(MOCK_TOKEN.name);
  });

  it('Checking token symbol', async () => {
    const result = await contracts.ERC20.symbol(provider, MOCK_TOKEN.address);
    expect(result).toBe(MOCK_TOKEN.symbol);
  });

  it('Checking token decimals', async () => {
    const result = await contracts.ERC20.decimals(provider, MOCK_TOKEN.address);
    expect(result).toBe(MOCK_TOKEN.decimals);
  });

  it('Checking token totalSupply', async () => {
    const result = await contracts.ERC20.totalSupply(provider, MOCK_TOKEN.address);
    expect(Number(result)).toBeGreaterThanOrEqual(0);
  });

  it('Checking token balance', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC20.balance(provider, MOCK_TOKEN.address, address);
    expect(result).toBeDefined();
  });

  it('Checking erc20 token transfer', async () => {
    const address = await wallet.getAddress();
    const walletSigner = getWalletSigner(wallet, provider);

    const maxFeePerGas = parseGasPrice(10);
    const maxPriorityFeePerGas = parseGasPrice(1.25);

    const result = await contracts.ERC20.transfer(walletSigner, MOCK_TOKEN.address, address, 1, {
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    expect(result).toBeDefined();
  }, 15000);

  it('Name of a non-existent token', async () => {
    const result = await contracts.ERC20.name(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('Symbol of a non-existent token', async () => {
    const result = await contracts.ERC20.symbol(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('Decimals of a non-existent token', async () => {
    const result = await contracts.ERC20.decimals(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('TotalSupply of a non-existent token', async () => {
    const result = await contracts.ERC20.totalSupply(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('Balance of a non-existent token', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC20.balance(provider, NONEXISTENT_TOKEN_ADDRESS, address);
    expect(result).toBeUndefined();
  });
});
