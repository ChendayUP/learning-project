// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const [owner] = await ethers.getSigners();
//     const Marketplace = await ethers.getContractFactory("NFTMarketplace");
//     const marketplace = await Marketplace.deploy();

//     await marketplace.deployed();

//     const transaction = await marketplace.getAllNFTs()
//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

// const { expect } = require("chai")
// const { ethers } = require("hardhat")

// describe("MyNFT", function () {
//   let MyNFT
//   let myNFT
//   let owner
//   let addr1
//   let addr2

//   beforeEach(async function () {
//     // 获取合约工厂和签名者
//     MyNFT = await ethers.getContractFactory("MyNFT")
//     ;[owner, addr1, addr2] = await ethers.getSigners()

//     // 部署合约
//     myNFT = await MyNFT.deploy()
//     await myNFT.deployed()
//   })

//   describe("Deployment", function () {
//     it("Should set the right owner", async function () {
//       expect(await myNFT.owner()).to.equal(owner.address)
//     })

//     it("Should have correct name and symbol", async function () {
//       expect(await myNFT.name()).to.equal("MyNFT")
//       expect(await myNFT.symbol()).to.equal("MNFT")
//     })
//   })

//   describe("Minting", function () {
//     it("Should mint a new token", async function () {
//       await myNFT.mintNFT(addr1.address, "https://example.com/token/1")
//       expect(await myNFT.balanceOf(addr1.address)).to.equal(1)
//     })

//     it("Should set the correct tokenURI", async function () {
//       await myNFT.mintNFT(addr1.address, "https://example.com/token/1")
//       expect(await myNFT.tokenURI(1)).to.equal("https://example.com/token/1")
//     })

//     it("Should only allow owner to mint", async function () {
//       await expect(
//         myNFT
//           .connect(addr1)
//           .mintNFT(addr2.address, "https://example.com/token/2")
//       ).to.be.revertedWith("Ownable: caller is not the owner")
//     })
//   })
// })
