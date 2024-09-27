const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  // const [deployer] = await ethers.getSigners();
  // const balance = await deployer.provider.getBalance();
  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();

  const data = {
    address: await marketplace.getAddress(),
    abi: marketplace.interface.formatJson()
  }
  // console.log(marketplace.getAddress())
  // console.log(marketplace.interface.formatJson())
  // console.log(data)
  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/pages/nft/Marketplace.json', JSON.stringify(data))
  console.log('address', data.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
