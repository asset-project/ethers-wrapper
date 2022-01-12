import dotEnv from 'dotenv';
import type { Provider } from '../src/types';
import { getProvider } from '../src';
import {
  erc721Name,
  erc721Symbol,
  erc721TotalSupply,
  erc721BalanceOf,
  erc721OwnerOf,
  erc721TokenURI,
} from '../src/helpers/contracts/erc721';

let provider: Provider | null = null;
const address = '0xd02246eD883e8aB92F363e7a35453DcFa2052669';

beforeAll(() => {
  dotEnv.config();

  provider = getProvider(process.env.JSON_RPC_URL) as Provider;
});

const MOCK_NFT = {
  address: '0xBF566E41552668741507400Cd3e805cBBD35fe0f',
  name: 'Mock NFT',
  symbol: 'MN',
};

const NONEXISTENT_TOKEN_ADDRESS = '0x333333333333333333333333333333333333333a';

describe('Test ERC721 methods', () => {
  it('Checking token name', async () => {
    const result = await erc721Name(provider, MOCK_NFT.address);
    expect(result).toBe(MOCK_NFT.name);
  });

  it('Checking token symbol', async () => {
    const result = await erc721Symbol(provider, MOCK_NFT.address);
    expect(result).toBe(MOCK_NFT.symbol);
  });

  it('Checking token totalSupply', async () => {
    const result = await erc721TotalSupply(provider, MOCK_NFT.address);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('Checking token balance', async () => {
    const result = await erc721BalanceOf(provider, MOCK_NFT.address, address);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('Checking token owner', async () => {
    const result = await erc721OwnerOf(provider, MOCK_NFT.address, 1);
    expect(result).toBe(address);
  });

  it('Checking token URI', async () => {
    const result = await erc721TokenURI(provider, MOCK_NFT.address, 1);
    expect(result).toBe('');
  });

  it('Name of a non-existent token', async () => {
    const result = await erc721Name(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('Symbol of a non-existent token', async () => {
    const result = await erc721Symbol(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('totalSupply of a non-existent token', async () => {
    const result = await erc721TotalSupply(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('token balance of a non-existent token', async () => {
    const result = await erc721BalanceOf(provider, NONEXISTENT_TOKEN_ADDRESS, address);
    expect(result).toBeUndefined();
  });

  it('token owner of a non-existent token', async () => {
    const result = await erc721OwnerOf(provider, NONEXISTENT_TOKEN_ADDRESS, 1);
    expect(result).toBeUndefined();
  });

  it('token URI of a non-existent token', async () => {
    const result = await erc721TokenURI(provider, NONEXISTENT_TOKEN_ADDRESS, 1);
    expect(result).toBeUndefined();
  });
});
