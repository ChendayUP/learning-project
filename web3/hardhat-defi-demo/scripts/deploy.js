const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  // console.log('owner:', owner)
  console.log(`部署合约的账户地址为：`, owner.address);
  console.log("账户余额为:", (await owner.provider.getBalance(owner.address)).toString());
  console.log(await owner.provider.getNetwork())
  console.log("合约部署的链ID为:", (await owner.provider.getNetwork()).chainId.toString());

  const initialSupply = hre.ethers.parseEther("1000000");
  const MyToken = await hre.ethers.getContractFactory("CxxToken");
  const myToken = await MyToken.deploy(initialSupply);
  // console.log(myToken)

  await myToken.waitForDeployment();

  console.log("MyToken deployed to:",await myToken.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });