const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
let JSONABI;
JSONABI = JSON.parse(interface);

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy
  // the contract

  
  inbox = await new web3.eth.Contract(JSONABI)
    .deploy({
      data: bytecode,
      arguments: [100, 'Hidden Figures', 0, 'HF' , 100]
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Deployment', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
})

describe('balances property', () => {

  it('balances property exist', () => {
    assert.ok(inbox.methods.balances);
  });

  it('balances type', () => {
      assert.equal("object", typeof JSONABI[4].inputs[0]);;
    });

it('balance[account 0] equal the initial ammount', async () => {
    const balance = await inbox.methods.balances(accounts[0]).call({
      from: accounts[0]
    });
    assert.equal(100, balance)
  });
})




describe('transfer function', () => {
  it('transfer function exist', () => {
    assert.ok(inbox.methods.transfer);
  });

  it('Performs a transaction and modifies a balance of account2', async () => {
     await inbox.methods.transfer(accounts[2],10).send ({
      from: accounts[0]
    });
     
      
  const balance2 = await inbox.methods.balances(accounts[2]).call({
      from: accounts[0]
    });
    
    assert.equal(10, balance2);
  
  })
})


describe('Approve', () => {
  it('approve function exist', () => {
    assert.ok(inbox.methods.approve);
  });

  it('The value of tokens an adress determines for another account to spend', async () => {
     await inbox.methods.approve(accounts[2],10).send({
      from: accounts[0]
    });
     
      
  const allowed2 = await inbox.methods.allowed(accounts[0],accounts[2]).call({
      from: accounts[0]
    })    
    
    assert.equal(10, allowed2);
  
  })
})


describe('transferFrom function', () => {
  it('transferFrom function exist', () => {
    assert.ok(inbox.methods.transferFrom);
  });

  it('Performs a transaction and modifies a balance of account2', async () => {
     await inbox.methods.transfer(accounts[2],10).send ({
      from: accounts[0]
    });
     
     await inbox.methods.approve(accounts[3],5).send ({
      from: accounts[2]
    });
     await inbox.methods.transferFrom(accounts[2],accounts[3],3).send ({
      from: accounts[3]
    }); 
    const balance3 = await inbox.methods.balances(accounts[3]).call({
      from: accounts[3]
    });
    
    assert.equal(3, balance3);
  
  })
})





describe('getTokens function', () => {
  it('getTokens function exist', () => {
    assert.ok(inbox.methods.getTokens);
  });

  it('receives tokens when you pay certain amount of ether ', async () => {
    await inbox.methods.getTokens().send({
      from: accounts[1],
      value: 1000
    });

    const tokens = await inbox.methods.balances(accounts[1]).call({
      from: accounts[1]
    });

    assert.equal(10, tokens);
  });
})

describe('getEthers function', () => {
it('getEthers function exist', () => {
    assert.ok(inbox.methods.getEthers);
  });

  it('receives ethers when you sell certain amount of tokens ', async () => {

    const Before =  await inbox.methods.getBalance().call({
      from: accounts[1]
    });

    await inbox.methods.getTokens().send({
      from: accounts[1],
      value: web3.utils.toWei('90', 'ether')
    });
    const after1 =  await inbox.methods.getBalance().call({
      from: accounts[1]
    });

    await inbox.methods.getEthers(900000000000000000).send({
      from: accounts[1]
    });

    const after2 =  await inbox.methods.getBalance().call({
      from: accounts[1]
    });

    const tokens = await inbox.methods.balances(accounts[1]).call({
      from: accounts[1]
    });

    assert.equal(0, tokens);
    assert.equal(99999041299999909000, Before);
    assert.equal(9998082599999909000,after1);
    assert.equal(99997558819999909000,after2);
  });
})

describe('getBalance function', () => {
  it('getBalance function exist', () => {
    assert.ok(inbox.methods.getBalance);
  });

  it('return balance ', async () => {
    await inbox.methods.getTokens().send({
      from: accounts[1],
      value: 1000
    });

   const B =  await inbox.methods.getBalance().call({
      from: accounts[1]
    });
       assert.equal(99996600119999908000, B);

  })
})

