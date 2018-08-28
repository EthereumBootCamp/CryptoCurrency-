/*
Implements EIP20 token standard: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
.*/


pragma solidity ^0.4.21;

import "./EIP20Interface.sol";// remove


contract BCCoin is testInterface {

    uint256 constant private MAX_UINT256 = 2**256 - 1;
   mapping (address => uint256) public balances;// remove
    mapping (address => mapping (address => uint256)) public allowed;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    uint8 public tokenValue; 
    address public Owner;
    //uint256 public Balance;

    constructor (
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol,
        uint8 _tokenValue
    ) public {
       Owner = msg.sender;
        // Give the creator all initial tokens
        balances[msg.sender] = _initialAmount;
        // Set the name for display purposes
        name = _tokenName;
        decimals = _decimalUnits;
        symbol = _tokenSymbol;
        tokenValue = _tokenValue;
        // Amount of decimals for display purposes
        // Set the symbol for display purposes
       
    }
    function getTokens() public payable {
        require(msg.value >= tokenValue);
        uint _value = msg.value/tokenValue;
        balances[Owner] -= _value;
        balances[msg.sender] += _value;

        
    }

    function getBalance() public returns (uint256 balance){
        return msg.sender.balance;

    }

    function getEthers(uint256 tokens) public  {
        require(tokens >= 1);
        uint _ethers = tokens*tokenValue;
        require(this.balance >= _ethers);

        balances[Owner] += tokens;
        balances[msg.sender] -= tokens;
        //players[index].transfer(this.balance);
        msg.sender.transfer(_ethers); 
    }

    function transfer(address _to, uint256 _value) public  {
        require(balances[msg.sender] >= _value);
       
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }

    function transferFrom(address _from, address _to, uint256 _value) public  {
        uint256 allowance = allowed[_from][msg.sender];
        // your code here
         require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
     
    }    
   
    function approve(address _spender, uint256 _value) public  {
        allowed[msg.sender][_spender] = _value;
       
       
    }

    
}