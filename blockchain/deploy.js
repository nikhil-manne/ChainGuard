async function main(){
  const C = await ethers.getContractFactory("PatternRegistry");
  const c = await C.deploy();
  await c.waitForDeployment();
  console.log(await c.getAddress());
}
main();