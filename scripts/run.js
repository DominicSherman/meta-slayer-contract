const characters = {
  Leo: {
    name: "Leo",
    image: "https://i.imgur.com/pKd5Sdk.png",
    hp: 100,
    attack: 100,
  },
  Aang: {
    name: "Aang",
    image: "https://i.imgur.com/xVu4vFL.png",
    hp: 200,
    attack: 50,
  },
  Pikachu: {
    name: "Pikachu",
    image: "https://i.imgur.com/WMB6g9u.png",
    hp: 300,
    attack: 25,
  }
}

const bigBoss = {
  name: 'The Zuck',
  image: 'https://images.newrepublic.com/b53d30e509b44bfc5f7bf3d3a03cc000fcd50623.jpeg?auto=compress&w=768&h=undefined&ar=3%3A2&fit=crop&crop=faces&q=65&fm=jpg&ixlib=react-9.0.2',
  hp: 1000,
  attack: 50,
}

const getFields = (fieldName) => Object.values(characters).map(character => character[fieldName]);

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory('MetaSlayer');
  
  const gameContract = await gameContractFactory.deploy(
    getFields('name'),
    getFields('image'),
    getFields('hp'),
    getFields('attack'),
    bigBoss.name,
    bigBoss.image,
    bigBoss.hp,
    bigBoss.attack,
  );

  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();