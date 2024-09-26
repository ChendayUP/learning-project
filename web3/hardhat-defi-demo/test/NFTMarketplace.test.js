const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("NFTMarketplace", function () {
  let NFTMarketplace
  let nftMarketplace
  let owner
  let addr1
  let addr2

  beforeEach(async function () {
    // 获取合约工厂
    NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")

    // 获取签名者
    ;[owner, addr1, addr2] = await ethers.getSigners()

    // 部署合约
    nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()
  })

  describe("getAllNFTs", function () {
    it("should return all listed NFTs", async function () {
      // 创建几个NFT
      const listPrice = await nftMarketplace.getListPrice()
      console.log(listPrice)
      await nftMarketplace.createToken("uri1", ethers.utils.parseEther("1"), {
        value: listPrice,
      })
      await nftMarketplace.createToken("uri2", ethers.utils.parseEther("2"), {
        value: listPrice,
      })
      await nftMarketplace
        .connect(addr1)
        .createToken("uri3", ethers.utils.parseEther("3"), { value: listPrice })

      // 获取所有NFT
      const allNFTs = await nftMarketplace.getAllNFTs()

      // 验证返回的NFT数量
      expect(allNFTs.length).to.equal(3)

      // 验证每个NFT的详情
      expect(allNFTs[0].tokenId).to.equal(1)
      expect(allNFTs[0].price).to.equal(ethers.utils.parseEther("1"))
      expect(allNFTs[0].currentlyListed).to.be.true

      expect(allNFTs[1].tokenId).to.equal(2)
      expect(allNFTs[1].price).to.equal(ethers.utils.parseEther("2"))
      expect(allNFTs[1].currentlyListed).to.be.true

      expect(allNFTs[2].tokenId).to.equal(3)
      expect(allNFTs[2].price).to.equal(ethers.utils.parseEther("3"))
      expect(allNFTs[2].currentlyListed).to.be.true
    })

    it("should return an empty array when no NFTs are listed", async function () {
      const allNFTs = await nftMarketplace.getAllNFTs()
      expect(allNFTs.length).to.equal(0)
    })
  })
})
