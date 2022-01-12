import { getWallet } from '../src';

const main = () => {
  const args = process.argv;

  const targetArray = args.filter((item) => item.startsWith('0x'));
  if (!targetArray.length) {
    return console.error('PrivateKey does not exist in the argument');
  }

  for (const privateKey of targetArray) {
    const wallet = getWallet(privateKey);
    if (!wallet) {
      console.log('[');
      console.log('  ', 'privateKey: ', privateKey);
      console.log('Failed to generate address. The format of the privateKey is different');
      console.log(']');
      continue;
    }

    console.log('[');
    console.log('  ', 'privateKey: ', privateKey);
    console.log('     ', 'address: ', wallet.address);
    console.log(']');
  }
};

main();
