import { expect } from 'chai';
import { ethers } from 'hardhat';
import { parseUnits } from 'ethers/lib/utils';

describe('ERC20 Mock', () => {
  it('Check meta data', async () => {
    const ERC20Mock = await ethers.getContractFactory('ERC20Mock');
    const erc20Mock = await ERC20Mock.deploy(
      'MockToken',
      'MT',
      '0xd02246eD883e8aB92F363e7a35453DcFa2052669',
      parseUnits('1000'),
    );
    await erc20Mock.deployed();

    expect(await erc20Mock.name()).to.equal('MockToken');
    expect(await erc20Mock.symbol()).to.equal('MT');
    expect(await erc20Mock.decimals()).to.equal(18);
    expect(await erc20Mock.totalSupply()).to.equal(parseUnits('1000'));
    expect(await erc20Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(
      parseUnits('1000'),
    );
  });

  it('Check Transfer', async () => {
    const ERC20Mock = await ethers.getContractFactory('ERC20Mock');
    const erc20Mock = await ERC20Mock.deploy(
      'MockToken',
      'MT',
      '0xd02246eD883e8aB92F363e7a35453DcFa2052669',
      parseUnits('1000'),
    );
    await erc20Mock.deployed();

    const transfer = await erc20Mock.transferInternal(
      '0xd02246eD883e8aB92F363e7a35453DcFa2052669',
      '0x5590beec679fE87E0D772272eB920Caaa396caaC',
      parseUnits('1'),
    );
    await transfer.wait();

    expect(await erc20Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(
      parseUnits('999'),
    );

    expect(await erc20Mock.balanceOf('0x5590beec679fE87E0D772272eB920Caaa396caaC')).to.equal(
      parseUnits('1'),
    );
  });
});
