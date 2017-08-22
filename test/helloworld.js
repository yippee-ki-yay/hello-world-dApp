const HelloWorld = artifacts.require("./HelloWorld.sol");

contract('HelloWorld', async (accounts) => {

  it("Call the sayHi method from the blockchain", async () => {

    const instance = await HelloWorld.deployed();

    const msg = await instance.sayHi.call(accounts[0]);

    assert.equal(msg, "Hello world ethereum, react and truffle", "We read the greeting msg");

  });

});
