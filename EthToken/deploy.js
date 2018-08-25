const HDWalletProvider = require('truffle-hdwallet-provider'); //It can be uses wherever a Web3 provider is needed, not just in Truffle. It will sign transactions for addresses derived from a 12-word mnemonic.
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'arctic hammer reflect habit hurt hedgehog decrease warm become swallow abuse lock',
  'https://rinkeby.infura.io/v3/ef087681f7924486b9092ecc6abf84bc'
);
const web3 = new Web3(provider);
let contractAddress;

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [1000, 'BCCoin', 0, 'BC' , 100] })
    .send({ gas: '1000000', from: accounts[0] });
  contractAddress = result.options.address;
  console.log('Contract deployed to', contractAddress);
};

deploy();
