require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [{ version: "0.8.0" }, { version: "0.6.6" }],
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    user: {
      default: 0,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    rinkeby: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4,
    },
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-reporter.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};
