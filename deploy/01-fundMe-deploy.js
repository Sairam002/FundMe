const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config"); // export module

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  //if chainId is X use address Y
  // if chainId is Y use addres A
  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
  let ethUsdPriceFeedAddress;
  if (chainId == 31337) {
    log("passed");
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethPrice"];
  }

  // if contract doesnt exist we deploy a minimial version
  // for our local testing

  // what happens when we want to change chains?
  // when going for localhost or hardhat network we want to use a mock
  // const arg = [ethUsdPriceFeedAddress]
  await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
};

module.exports.tags = ["all", "fundMe"];
