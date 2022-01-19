import dotEnv from 'dotenv';
import { numberOfTokens, formatGasPrice, type Provider, getProvider } from '../src';

const provider: Provider | null = null;

// beforeAll(() => {
//   dotEnv.config();

//   provider = getProvider(process.env.JSON_RPC_URL) as Provider;
// });

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
});
