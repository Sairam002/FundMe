require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[{version:"0.8.0"},{version:"0.6.6"}],
  },
  namedAccounts:{
    deployer: {
      default:0
    },
    user:{
      default: 0,
    }
  },
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId: 31337,
    },
    rinkeby:{
      url: process.env.RinkebyRPC_URL,
      accounts:[process.env.PrivateKey],
      chainId: 4
    }
  }
};