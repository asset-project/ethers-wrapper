import dotEnv from 'dotenv';
import type { ethers } from 'ethers';
import type { Provider } from '../src/types';
import { getProvider, getWallet, contracts } from '../src';

let wallet: ethers.Wallet | null = null;
let provider: Provider | null = null;

beforeAll(() => {
  dotEnv.config();

  wallet = getWallet(process.env.PRIVATE_KEY);
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
    const result = await contracts.ERC721.name(provider, MOCK_NFT.address);
    expect(result).toBe(MOCK_NFT.name);
  });

  it('Checking token symbol', async () => {
    const result = await contracts.ERC721.symbol(provider, MOCK_NFT.address);
    expect(result).toBe(MOCK_NFT.symbol);
  });

  it('Checking token totalSupply', async () => {
    const result = await contracts.ERC721.totalSupply(provider, MOCK_NFT.address);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('Checking token balance', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC721.balanceOf(provider, MOCK_NFT.address, address);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it('Checking token owner', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC721.ownerOf(provider, MOCK_NFT.address, 1);
    expect(result).toBe(address);
  });

  it('Checking token URI', async () => {
    const result = await contracts.ERC721.tokenURI(provider, MOCK_NFT.address, 1);
    expect(result).toBe('');
  });

  it('Name of a non-existent token', async () => {
    const result = await contracts.ERC721.name(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('Symbol of a non-existent token', async () => {
    const result = await contracts.ERC721.symbol(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('totalSupply of a non-existent token', async () => {
    const result = await contracts.ERC721.totalSupply(provider, NONEXISTENT_TOKEN_ADDRESS);
    expect(result).toBeUndefined();
  });

  it('token balance of a non-existent token', async () => {
    const address = await wallet.getAddress();
    const result = await contracts.ERC721.balanceOf(provider, NONEXISTENT_TOKEN_ADDRESS, address);
    expect(result).toBeUndefined();
  });

  it('token owner of a non-existent token', async () => {
    const result = await contracts.ERC721.ownerOf(provider, NONEXISTENT_TOKEN_ADDRESS, 1);
    expect(result).toBeUndefined();
  });

  it('token URI of a non-existent token', async () => {
    const result = await contracts.ERC721.tokenURI(provider, NONEXISTENT_TOKEN_ADDRESS, 1);
    expect(result).toBeUndefined();
  });
});
