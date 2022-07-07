const Web3Me = artifacts.require("./Web3Me.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Web3Me", ([deployer, author]) => {
  let web3me;

  before(async () => {
    web3me = await Web3Me.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await web3me.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await web3me.name();
      assert.equal(name, "Web3Me");
    });
  });

  describe("files", async () => {
    let result, fileCount;
    const hash = "QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb";

    before(async () => {
      result = await web3me.uploadFile(hash, "File description", {
        from: author,
      });
      fileCount = await web3me.fileCount();
    });

    //check event
    it("creates files", async () => {
      // SUCESS
      assert.equal(fileCount, 1);
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), fileCount.toNumber(), "id is correct");
      assert.equal(event.hash, hash, "Hash is correct");
      assert.equal(
        event.description,
        "File description",
        "description is correct"
      );
      assert.equal(event.author, author, "author is correct");

      // FAILURE: Image must have hash
      await web3me.uploadFile("", "File description", { from: author }).should
        .be.rejected;

      // FAILURE: Image must have description
      await web3me.uploadFile("File hash", "", { from: author }).should.be
        .rejected;
    });

    //check from Struct
    it("lists files", async () => {
      const file = await web3me.files(fileCount);
      assert.equal(file.id.toNumber(), fileCount.toNumber(), "id is correct");
      assert.equal(file.hash, hash, "Hash is correct");
      assert.equal(
        file.description,
        "File description",
        "description is correct"
      );
      assert.equal(file.author, author, "author is correct");
    });
  });
});
