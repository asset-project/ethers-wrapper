import dotEnv from 'dotenv';
import type { ethers } from 'ethers';
import {
  contracts,
  getProvider,
  getWallet,
  getWalletSigner,
  numberOfTokens,
  formatUnits,
  parseGasPrice,
  type Provider,
} from '../src';

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
  totalSupply: '1000000000000000000000000',
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
    expect(result.toString()).toBe(MOCK_TOKEN.totalSupply);
  });

  it('Checking token balance', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC20.balance(provider, MOCK_TOKEN.address, address);
    expect(result.toString()).toBeDefined();
  });

  it('Checking token methods', async () => {
    const result = await contracts.ERC20.token(provider, MOCK_TOKEN.address);

    expect(result[0]).toBe(MOCK_TOKEN.name);
    expect(result[1]).toBe(MOCK_TOKEN.symbol);
    expect(result[2]).toBe(MOCK_TOKEN.decimals);
    expect(result[3].toString()).toBe(MOCK_TOKEN.totalSupply);
  });

  it('Checking erc20 token transfer', async () => {
    const walletSigner = getWalletSigner(wallet, provider);

    const to = '0x05b95eD55FcDd1Bc4a34EEF57989F76fc8fe15F5';
    const amount = numberOfTokens(1, MOCK_TOKEN.decimals);

    const beforeSenderBalance = await contracts.ERC20.balance(
      provider,
      MOCK_TOKEN.address,
      wallet.address,
    );
    const beforeReceiverBalance = await contracts.ERC20.balance(provider, MOCK_TOKEN.address, to);

    const BSB = Math.floor(Number(formatUnits(beforeSenderBalance, MOCK_TOKEN.decimals)));
    const BRB = Math.floor(Number(formatUnits(beforeReceiverBalance, MOCK_TOKEN.decimals)));

    const gasPrice = parseGasPrice(10);

    const tx = await contracts.ERC20.transfer(walletSigner, MOCK_TOKEN.address, to, amount, {
      gasPrice,
    });
    expect(tx).toBeDefined();

    await tx.wait();

    const afterSenderBalance = await contracts.ERC20.balance(
      provider,
      MOCK_TOKEN.address,
      wallet.address,
    );
    const afterReceiverBalance = await contracts.ERC20.balance(provider, MOCK_TOKEN.address, to);

    const ASB = Math.floor(Number(formatUnits(afterSenderBalance, MOCK_TOKEN.decimals)));
    const ARB = Math.floor(Number(formatUnits(afterReceiverBalance, MOCK_TOKEN.decimals)));

    expect(ASB).toBe(BSB - Math.floor(Number(formatUnits(amount, MOCK_TOKEN.decimals))));
    expect(ARB).toBe(BRB + Math.floor(Number(formatUnits(amount, MOCK_TOKEN.decimals))));
  }, 36000);

  it('Checking estimate gas for erc20 transfer', async () => {
    const walletSigner = getWalletSigner(wallet, provider);
    const address = await walletSigner.getAddress();

    const result = await contracts.ERC20.transferEstimateGas(
      walletSigner,
      MOCK_TOKEN.address,
      address,
      numberOfTokens(100, MOCK_TOKEN.decimals),
    );

    expect(result.toNumber()).toBeGreaterThanOrEqual(30000);
  });

  it('Checking call static for erc20 token transfer', async () => {
    const walletSigner = getWalletSigner(wallet, provider);
    const address = await walletSigner.getAddress();

    const amount = numberOfTokens(1, MOCK_TOKEN.decimals);

    const result = await contracts.ERC20.callStaticTransfer(
      walletSigner,
      MOCK_TOKEN.address,
      address,
      amount,
    );
    expect(result).toBe(true);

    const overBalance = numberOfTokens(1000000000, MOCK_TOKEN.decimals);

    const resultFalse = await contracts.ERC20.callStaticTransfer(
      walletSigner,
      MOCK_TOKEN.address,
      address,
      overBalance,
    );
    expect(resultFalse).toBe(false);
  });

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
