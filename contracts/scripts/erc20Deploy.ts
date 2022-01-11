import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';

const main = async () => {
  const Erc20Mock = await ethers.getContractFactory('ERC20Mock');
  const erc20Mock = await Erc20Mock.deploy(
    'Mock Token',
    'MT',
    '0xd02246eD883e8aB92F363e7a35453DcFa2052669',
    parseUnits('1000000'),
  );

  await erc20Mock.deployed();

  console.log('ERC20 Mock Token deployed to:', erc20Mock.address);
};

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
