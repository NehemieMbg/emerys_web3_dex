const config = require("../src/config.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const wait = (seconds) => {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
  const accounts = await ethers.getSigners();

  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using chainId: ", chainId);

  const EMRS = await ethers.getContractAt(
    "Emerys",
    config[chainId].EMRS.address
  );
  console.log(`EMRS Token fetched: ${EMRS.address}\n`);

  const WRG = await ethers.getContractAt("Warg", config[chainId].WRG.address);
  console.log(`WRG Token fetched: ${WRG.address}\n`);

  const MOON = await ethers.getContractAt("Moon", config[chainId].MOON.address);
  console.log(`MOON Token fetched: ${MOON.address}\n`);

  const YSHI = await ethers.getContractAt(
    "Yoshi",
    config[chainId].YSHI.address
  );
  console.log(`YSHI Token fetched: ${YSHI.address}\n`);

  const exchange = await ethers.getContractAt(
    "Dex",
    config[chainId].exchange.address
  );
  console.log(`Exchange fetched: ${exchange.address}\n`);

  const sender = accounts[0];
  const receiver = accounts[1];
  let amount = 10000;

  let transaction, result;
  transaction = await EMRS.connect(sender).transfer(receiver.address, amount);
  console.log(
    `Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`
  );

  const user1 = accounts[0];
  const user2 = accounts[1];
  amount = 1000;

  transaction = await EMRS.connect(user1).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user1.address}`);

  ////////////////////////////////////////
  transaction = await exchange
    .connect(user1)
    .depositToken(EMRS.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} EMRS from ${user1.address}\n`);

  transaction = await WRG.connect(user2).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user2.address}`);

  transaction = await exchange.connect(user2).depositToken(WRG.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} tokens from ${user2.address}\n`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
