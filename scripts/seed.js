const config = require("../src/config.json");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

const wait = (seconds) => {
  const milliseconds = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

async function main() {
  // Fetch accounts from wallet - these are unlocked
  const accounts = await ethers.getSigners();

  // Fetch network
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using chainId:", chainId);

  // Fetch deployed tokens
  const EMRS = await ethers.getContractAt(
    "ERC20",
    config[chainId].EMRS.address
  );
  console.log(`EMRS Token fetched: ${EMRS.address}\n`);

  const WRG = await ethers.getContractAt("ERC20", config[chainId].WRG.address);
  console.log(`WRG Token fetched: ${WRG.address}\n`);

  const MOON = await ethers.getContractAt(
    "ERC20",
    config[chainId].MOON.address
  );
  console.log(`MOON Token fetched: ${MOON.address}\n`);

  // Fetch the deployed exchange
  const exchange = await ethers.getContractAt(
    "Dex",
    config[chainId].exchange.address
  );
  console.log(`Exchange fetched: ${exchange.address}\n`);

  // Give tokens to account[1]
  const sender = accounts[0];
  const receiver = accounts[1];
  let amount = tokens(10000);

  // user1 transfers 10,000 WRG...
  let transaction, result;
  transaction = await WRG.connect(sender).transfer(receiver.address, amount);
  console.log(
    `Transferred ${amount} tokens from ${sender.address} to ${receiver.address}\n`
  );

  // Set up exchange users
  const user1 = accounts[0];
  const user2 = accounts[1];
  amount = tokens(10000);

  // user1 approves 10,000 EMRS...
  transaction = await EMRS.connect(user1).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user1.address}`);

  // user1 deposits 10,000 EMRS...
  transaction = await exchange
    .connect(user1)
    .depositToken(EMRS.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} Ether from ${user1.address}\n`);

  // User 2 Approves WRG
  transaction = await WRG.connect(user2).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approved ${amount} tokens from ${user2.address}`);

  // User 2 Deposits WRG
  transaction = await exchange.connect(user2).depositToken(WRG.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} tokens from ${user2.address}\n`);

  /////////////////////////////////////////////////////////////
  // Seed a Cancelled Order

  // User 1 makes order to get tokens
  let orderId;
  transaction = await exchange
    .connect(user1)
    .makeOrder(WRG.address, tokens(100), EMRS.address, tokens(5));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 1 cancels order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user1).cancelOrder(orderId);
  result = await transaction.wait();
  console.log(`Cancelled order from ${user1.address}\n`);

  // Wait 1 second
  await wait(1);

  /////////////////////////////////////////////////////////////
  // Seed Filled Orders

  // User 1 makes order
  transaction = await exchange
    .connect(user1)
    .makeOrder(WRG.address, tokens(100), EMRS.address, tokens(10));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  result = await transaction.wait();
  console.log(`Filled order from ${user1.address}\n`);

  // Wait 1 second
  await wait(1);

  // User 1 makes another order
  transaction = await exchange.makeOrder(
    WRG.address,
    tokens(50),
    EMRS.address,
    tokens(15)
  );
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills another order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  result = await transaction.wait();
  console.log(`Filled order from ${user1.address}\n`);

  // Wait 1 second
  await wait(1);

  // User 1 makes final order
  transaction = await exchange
    .connect(user1)
    .makeOrder(WRG.address, tokens(200), EMRS.address, tokens(20));
  result = await transaction.wait();
  console.log(`Made order from ${user1.address}`);

  // User 2 fills final order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  result = await transaction.wait();
  console.log(`Filled order from ${user1.address}\n`);

  // Wait 1 second
  await wait(1);

  /////////////////////////////////////////////////////////////
  // Seed Open Orders

  // User 1 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user1)
      .makeOrder(WRG.address, tokens(10 * i), EMRS.address, tokens(10));
    result = await transaction.wait();

    console.log(`Made order from ${user1.address}`);

    // Wait 1 second
    await wait(1);
  }

  // User 2 makes 10 orders
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user2)
      .makeOrder(EMRS.address, tokens(10), WRG.address, tokens(10 * i));
    result = await transaction.wait();

    console.log(`Made order from ${user2.address}`);

    // Wait 1 second
    await wait(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
