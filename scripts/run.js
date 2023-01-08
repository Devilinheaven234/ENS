const main = async () => {
  //const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  //We're passing "shards" to the constructor when deploying 
  const domainContract = await domainContractFactory.deploy("shards");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);
  //console.log("Contract deployed by:", owner.address);

  //We're passing in a 2nd variable - value. This is the moneyyyyyyyy  
  let txn = await domainContract.register("Devansh", {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();

  const address = await domainContract.getAddress("Devansh");
  console.log("Owner of domain:", address);

  // Trying to set a record that doesn't belong to me !
  /*const txn1 = await domainContract.connect(randomPerson).setRecord("Devansh","Haha my domain now!");
  await txn1.wait();*/

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

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