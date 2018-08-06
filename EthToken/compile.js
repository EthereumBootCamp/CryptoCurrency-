const path = require('path');
const fs = require('fs');
const solc = require('solc');

const HFPath = path.resolve(__dirname, 'contracts', 'HiddenFig.sol');
const interfacePath = path.resolve(__dirname, 'contracts', 'EIP20Interface.sol');

const source = fs.readFileSync(HFPath, 'utf8');
const source2 = fs.readFileSync(interfacePath, 'utf8');

const input = {
  sources: {
    'HiddenFig.sol': source,
    'EIP20Interface.sol': source2
  }
};
let compiled = solc.compile(input, 1);
console.log(compiled); 
module.exports  = compiled.contracts[ 'HiddenFig.sol:HiddenFig'];
