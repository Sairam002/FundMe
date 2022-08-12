const { assert, expect } = require("chai");
const { deployments, getNamedAccounts, ethers } = require("hardhat");

describe("Testing for Fund Me contract", function () {
  let fundMe;
  var deployer;
  let mock;
  const sendAmount = ethers.utils.parseEther("10");

  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    mock = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("Constructor", () => {
    it("Constructor address for mock", async function () {
      const address = mock.address;
      const response = await fundMe.getPriceFeed();

      assert.equal(address, response);
    });
  });

  describe("fund", function () {
    it("Fail if enough enough ETH is not sent", async function () {
      await expect(fundMe.fund()).to.be.revertedWith(
        "You need to spend more ETH!"
      );
    });

    it("Updates the person in the mapping", async function () {
      await fundMe.fund({ value: sendAmount });
      const response = await fundMe.s_addressToAmountFunded(deployer);
      assert.equal(response.toString(), sendAmount.toString());
    });

    it("Add funder to the array", async function () {
      await fundMe.fund({ value: sendAmount });
      const response = await fundMe.getFunder([0]);
      assert.equal(deployer, response);
    });
  });
});
