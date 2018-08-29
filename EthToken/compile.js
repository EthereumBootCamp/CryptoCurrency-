const path = require('path');
const fs = require('fs');
const solc = require('solc'); // JavaScript bindings for the Solidity compiler.
const BCPath = path.resolve(__dirname, 'contracts', 'BCCoin.sol'); 
const interfacePath = path.resolve(__dirname, 'contracts', 'Interface.sol');

const source = fs.readFileSync(BCPath, 'utf8');
const source2 = fs.readFileSync(interfacePath, 'utf8');

// to compile more than one contact 
const input = {
  sources: {
    'BCCoin.sol': source,
    'Interface.sol': source2
  }
};
let compiled = solc.compile(input, 1); // compiled contarct
console.log(compiled); // it will help you in fixing your solidity code, comment it when youre done. 
module.exports  = compiled.contracts[ 'BCCoin.sol:BCCoin'];
