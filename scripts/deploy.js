const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const Silvyx = await hre.ethers.getContractFactory("Silvyx");
  const silvyx = await Silvyx.deploy();

  await silvyx.deployed();

  const data = {
    address: silvyx.address,
    abi: JSON.parse(silvyx.interface.format('json'))
  }

  //This writes the ABI and address to the mktplace.json
  fs.writeFileSync('./src/abis/abis.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
