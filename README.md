# Emerys: A Decentralized Exchange Application

Emerys is a decentralized application that enables users to exchange tokens on the Ethereum blockchain without intermediaries or centralized exchanges. It provides a secure, reliable, and efficient way to trade tokens, while empowering users to have complete control over their assets.

Click [here](https://www.youtube.com/watch?v=AAGJ_j0sJcs&t=109s&ab_channel=6nehemie) for a demo

## Installation

- Install the project represitory into your computer: <br>

  ```linux
  git clone git@github.com:NehemieMbg/emerys_web3_dex.git
  ```

- Install all the dependencies using

  ```linux
  npm install
  ```

- Make sure that you have a MetaMask Wallet if not you can download this extension [here](https://metamask.io/download/).

## Usage

### Start the project with the following command:

This command below will start a local ethereum blockchain. We chose to work on a local blockchain to reduce the price of development, as you learn working with the ethereum blockchain is pricy.

```linux
npx hardhat node
```

Deploy the contracts to the local blockchain using these command lines:

```linux
npx hardhat run --network localhost scripts/deploy.js

npx hardhat run --network localhost scripts/seed.js
```

Now that the project is on your local Blockchain lunch the app to start intracting with it:

```linux
npm run start
```

[Landing page](https://nehemiembg.github.io/emerys-landing-page/)
