import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('ERC721 Mock', () => {
  it('Check meta data', async () => {
    const ERC721Mock = await ethers.getContractFactory('ERC721Mock');
    const erc721Mock = await ERC721Mock.deploy('Mock NFT', 'MN');
    await erc721Mock.deployed();

    expect(await erc721Mock.name()).to.equal('Mock NFT');
    expect(await erc721Mock.symbol()).to.equal('MN');
    expect(await erc721Mock.getOwner()).to.equal('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });

  it('Check Mint Token', async () => {
    const ERC721Mock = await ethers.getContractFactory('ERC721Mock');
    const erc721Mock = await ERC721Mock.deploy('Mock NFT', 'MN');
    await erc721Mock.deployed();

    const mint = await erc721Mock.mint('0xd02246eD883e8aB92F363e7a35453DcFa2052669', 1);
    await mint.wait();

    expect(await erc721Mock.exists(1)).to.equal(true);
    expect(await erc721Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(1);
    expect(await erc721Mock.ownerOf(1)).to.equal('0xd02246eD883e8aB92F363e7a35453DcFa2052669');
  });

  it('Check Burn Token', async () => {
    const ERC721Mock = await ethers.getContractFactory('ERC721Mock');
    const erc721Mock = await ERC721Mock.deploy('Mock NFT', 'MN');
    await erc721Mock.deployed();

    const mint = await erc721Mock.mint('0xd02246eD883e8aB92F363e7a35453DcFa2052669', 1);
    await mint.wait();

    expect(await erc721Mock.exists(1)).to.equal(true);
    expect(await erc721Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(1);
    expect(await erc721Mock.ownerOf(1)).to.equal('0xd02246eD883e8aB92F363e7a35453DcFa2052669');

    const burn = await erc721Mock.burn(1);
    await burn.wait();

    expect(await erc721Mock.exists(1)).to.equal(false);
    expect(await erc721Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(0);
  });

  it('Check Transfer Token', async () => {
    const ERC721Mock = await ethers.getContractFactory('ERC721Mock');
    const erc721Mock = await ERC721Mock.deploy('Mock NFT', 'MN');
    await erc721Mock.deployed();

    const mint = await erc721Mock.mint('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 1);
    await mint.wait();

    const transfer = await erc721Mock.transferFrom(
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      '0xd02246eD883e8aB92F363e7a35453DcFa2052669',
      1,
    );
    await transfer.wait();

    expect(await erc721Mock.balanceOf('0xd02246eD883e8aB92F363e7a35453DcFa2052669')).to.equal(1);
    expect(await erc721Mock.ownerOf(1)).to.equal('0xd02246eD883e8aB92F363e7a35453DcFa2052669');
  });
});
