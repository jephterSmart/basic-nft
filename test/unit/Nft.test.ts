import { developmentNetwork } from "../../utils/hardhat-config"
import { network, ethers, ignition } from "hardhat"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers"
import { expect, assert } from "chai"
import NftModule from "../../ignition/modules/Nft"
import { Nft } from "../../typechain-types"

!developmentNetwork.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          async function deployNftModuleFixture() {
              const accounts = await ethers.getSigners()
              const deployer = accounts[0]
              const { nft } = await ignition.deploy(NftModule)
              return { nft, deployer }
          }

          describe("Constructor", () => {
              it("Initializes the NFT Correctly.", async () => {
                  const { nft } = await loadFixture(deployNftModuleFixture)
                  const name = await (nft as unknown as Nft).name()
                  const symbol = await (nft as unknown as Nft).symbol()
                  const tokenCounter = await (
                      nft as unknown as Nft
                  ).getTokenCounter()
                  expect(name).to.equal("Doggie")
                  expect(symbol).to.equal("DOG")
                  expect(tokenCounter.toString()).to.equal("0")
              })
          })
          //test02
          describe("Mint NFT", () => {
              let nft: Nft, deployer: any
              beforeEach(async () => {
                  const { nft: contract, deployer: dep } = await loadFixture(
                      deployNftModuleFixture
                  )
                  nft = contract as unknown as Nft
                  deployer = dep
                  const txResponse = await (
                      contract as unknown as Nft
                  ).mintNft()
                  await txResponse.wait(1)
              })
              it("Allows users to mint an NFT, and updates appropriately", async function () {
                  const tokenURI = await nft.tokenURI(0)
                  const tokenCounter = await nft.getTokenCounter()

                  expect(tokenCounter.toString()).to.equal("1")
                  expect(tokenURI).to.equal(await nft.TOKEN_URI())
              })
              it("Show the correct balance and owner of an NFT", async function () {
                  const deployerAddress = deployer.address
                  const deployerBalance = await nft.balanceOf(deployerAddress)
                  const owner = await nft.ownerOf("1")

                  assert.equal(deployerBalance.toString(), "1")
                  assert.equal(owner, deployerAddress)
              })
          })
      })
