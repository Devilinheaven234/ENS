const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy();
  await domainContract.deployed();
  console.log("Contract deployed to:", domainContract.address);
  console.log("Contract deployed by:", owner.address);
  
  const txn = await domainContract.register("Devansh");
  await txn.wait();

  const domainAddress = await domainContract.getAddress("Devansh");
  console.log("Owner of domain:", domainAddress);

  // Trying to set a record that doesn't belong to me !
  const txn1 = await domainContract.connect(randomPerson).setRecord("Devansh","Haha my domain now!");
  await txn1.wait();


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