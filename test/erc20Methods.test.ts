import dotEnv from 'dotenv';
import type { Provider } from '../src/types';
import { getProvider } from '../src/providers';
import {
  erc20Balance,
  erc20Decimals,
  erc20Name,
  erc20Symbol,
} from '../src/helpers/contracts/erc20';

let provider: Provider | null = null;
const address = '0x5590beec679fE87E0D772272eB920Caaa396caaC';

beforeAll(() => {
  dotEnv.config();

  provider = getProvider(process.env.JSON_RPC_URL) as Provider;
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
    const name = await erc20Name(provider, MOCK_TOKEN.address);
    expect(name).toBe(MOCK_TOKEN.name);
  });

  it('Checking token symbol', async () => {
    const symbol = await erc20Symbol(provider, MOCK_TOKEN.address);
    expect(symbol).toBe(MOCK_TOKEN.symbol);
  });

  it('Checking token decimals', async () => {
    const decimals = await erc20Decimals(provider, MOCK_TOKEN.address);
    expect(decimals).toBe(MOCK_TOKEN.decimals);
  });

  it('Checking token balance', async () => {
    const balance = await erc20Balance(provider, MOCK_TOKEN.address, address);
    expect(balance).toBeDefined();
  });

  it('Name of a non-existent token', async () => {
    const name = await erc20Name(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(name).toBeUndefined();
  });

  it('Symbol of a non-existent token', async () => {
    const symbol = await erc20Symbol(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(symbol).toBeUndefined();
  });

  it('Decimals of a non-existent token', async () => {
    const decimals = await erc20Decimals(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(decimals).toBeUndefined();
  });

  it('Balance of a non-existent token', async () => {
    const balance = await erc20Balance(provider, NONEXISTENT_TOKEN_ADDRESS, address);
    expect(balance).toBeUndefined();
  });
});
