import { createWallet } from '../src/wallet';

const main = async () => {
  const wallet = await createWallet();
  console.log('address: ', wallet.address);
  console.log('mnemonic: ', wallet.mnemonic);
  console.log('privateKey: ', wallet.privateKey);
};

main();
