async function main() {
  console.log(`Preparing deployment...\n`);

  // Fetch contract to deploy
  const ERC20 = await ethers.getContractFactory("ERC20");
  const Exchange = await ethers.getContractFactory("Dex");

  // Fetch accounts
  const accounts = await ethers.getSigners();

  console.log(
    `Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`
  );

  // Deploy contracts
  const EMRS = await ERC20.deploy("Emerys", "EMRS", "1000000");
  await EMRS.deployed();
  console.log(`EMRS Deployed to: ${EMRS.address}`);

  const WARG = await ERC20.deploy("Warg", "WARG", "1000000");
  await WARG.deployed();
  console.log(`WARG Deployed to: ${WARG.address}`);

  const MOON = await ERC20.deploy("Moon", "MOON", "1000000");
  await MOON.deployed();
  console.log(`MOON Deployed to: ${MOON.address}`);

  const exchange = await Exchange.deploy(accounts[1].address, 10);
  await exchange.deployed();
  console.log(`Exchange Deployed to: ${exchange.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
