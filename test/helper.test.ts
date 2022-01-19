import dotEnv from 'dotenv';
import {
  type Provider,
  numberOfTokens,
  formatGasPrice,
  getProvider,
  getEnsResolver,
  lookupAddress,
  resolveName,
} from '../src';

let provider: Provider | null = null;

beforeAll(() => {
  dotEnv.config();

  provider = getProvider(process.env.MAIN_NET_JSON_RPC_URL) as Provider;
});

describe('Test helper', () => {
  it('Test the numberOfTokens', () => {
    const bigNumber = numberOfTokens(100, 8);
    expect(bigNumber.toString()).toBe('10000000000');
    expect(bigNumber.toNumber()).toBe(10000000000);
  });

  it('Test the formatGasPrice', () => {
    const bigNumber = formatGasPrice(12);
    expect(bigNumber.toHexString()).toBe('0x02cb417800');
  });

  it('Test the lookupAddress', async () => {
    const ensName = await lookupAddress(provider, '0x983110309620D911731Ac0932219af06091b6744');
    expect(ensName).toBe('brantly.eth');
  }, 15000);

  it('Test the lookupAddress(null)', async () => {
    const ensName = await lookupAddress(provider, '0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9');
    expect(ensName).toBe(null);
  }, 15000);

  it('Test the resolveName', async () => {
    const result = await resolveName(provider, 'brantly.eth');
    expect(result).toBe('0x983110309620D911731Ac0932219af06091b6744');
  }, 15000);

  it('Test the resolveName', async () => {
    const result = await resolveName(provider, 'ens.eth');
    expect(result).toBe('0xb6E040C9ECAaE172a89bD561c5F73e1C48d28cd9');
  }, 15000);

  it('Test the getEnsResolver', async () => {
    const ens = await getEnsResolver(provider, 'ens.eth');
    const result = await ens.getAvatar();
    expect(result.url).toBeDefined();
  }, 15000);
});
