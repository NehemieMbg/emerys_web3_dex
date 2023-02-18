const { ethers, hre } = require("hardhat");
const fs = require("fs/promises");

async function main() {
  // Dex contract deployment
  const Dex = await ethers.getContractFactory("Dex");
  const dex = await Dex.deploy();
  await dex.deployed();
  console.log(`Dex deployed to: ${dex.address}`);

  // Wallet contract deployment
  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy();
  await wallet.deployed();
  console.log(`Wallet deployed to: ${wallet.address}`);

  // Emerys token deployment
  const Emerys = await ethers.getContractFactory("Emerys");
  const emerys = await Emerys.deploy();
  await emerys.deployed();
  console.log(`Emerys deployed to: ${emerys.address}`);

  // Warg token deployment
  const Warg = await ethers.getContractFactory("Warg");
  const warg = await Warg.deploy();
  await warg.deployed();
  console.log(`Warg deployed to: ${warg.address}`);
}

// async function writeDeploymentInfo(contract, filename = "") {
//   const data = {
//     network: hre.network.name,
//     contract: {
//       address: contract.address,
//       signerAddress: contract.signer.address,
//       abi: contract.interface.format,
//     },
//   };

//   const content = JSON.stringify(data, null, 2);
//   await fs.writeFile(filename, content, { encoding: "utf-8" });
// }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
