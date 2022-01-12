import { ethers } from 'hardhat';

const main = async () => {
  const Erc721Mock = await ethers.getContractFactory('ERC721Mock');
  const erc721Mock = await Erc721Mock.deploy('Mock NFT', 'MN');
  await erc721Mock.deployed();

  console.log('ERC721 Mock Token deployed to:', erc721Mock.address);

  console.log('generate Tokens');
  try {
    const mint1 = await erc721Mock.mint('0xd02246eD883e8aB92F363e7a35453DcFa2052669', 1);
    await mint1.wait();
    console.log('mint token Id: ', 1);
  } catch {
    console.log('error mint function');
  }

  try {
    const mint2 = await erc721Mock.mint('0xd02246eD883e8aB92F363e7a35453DcFa2052669', 2);
    await mint2.wait();
    console.log('mint token Id: ', 2);
  } catch {
    console.log('error mint function');
  }
};

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
