import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider) //the web3 provider that is injected by MetaMask. (This will let our instance f web3 to automatically connect to the test network and make use of all the accounts that have been assigned to metamask extension)

export default web3;