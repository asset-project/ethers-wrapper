import dotEnv from 'dotenv';
import type { Wallet } from 'ethers';
import { ethSendTransaction, getWalletProvider } from '../src';

let wallet: Wallet | null = null;

beforeAll(() => {
  dotEnv.config();

  wallet = getWalletProvider(process.env.PRIVATE_KEY, process.env.TESTNET_JSON_RPC_URL);
});

describe('Test Transaction', () => {
  it('Test transaction methods', async () => {
    const to = await wallet.getAddress();

    const tx = await ethSendTransaction(wallet, { type: 'type2', to, value: '0.0002' });
    expect(tx).not.toBeFalsy();

    if (tx) {
      const result = await tx.wait();
      expect(result.type).toBe(2);
    }
  }, 60000);
});
