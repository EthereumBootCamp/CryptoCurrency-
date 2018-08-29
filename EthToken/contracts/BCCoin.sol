
pragma solidity ^0.4.21;

import "./Interface.sol"; // Importing the interface so it could be inherited in this contract.


contract BCCoin is Interface {    // Inheriting the interface requires implementing all the functions inside the interface.

    uint256 constant private MAX_UINT256 = 2**256 - 1;
   mapping (address => uint256) public balances;   // this mapping is used to to store the number of addresses each address has. 
    
    
    
    //this mapping used if an address wants to give permission to another address to spend some amount of token from 
    //his account.
    mapping (address => mapping (address => uint256)) public allowed;  
    
    
    
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX
    uint8 public tokenValue;              //token value in ethers
    address public Owner;                 //address account who deplyed the contract 

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
        
       // Amount of decimals for display purposes 
        decimals = _decimalUnits;
        
         // Set the symbol for display purposes
        symbol = _tokenSymbol;
        
        //Set the token value for selling and buying purposes
        tokenValue = _tokenValue;
   
    }
 
    //transfers tokens to the given address from the balance of the message sender.
    function transfer(address _to, uint256 _value) public  {
  
        require(balances[msg.sender] >= _value);  // makes sure message sender balance has the value he wants to transfer.
       
        balances[msg.sender] -= _value;
        balances[_to] += _value;
    }

    function transferFrom(address _from, address _to, uint256 _value) public  {
        uint256 allowance = allowed[_from][msg.sender]; // the value that the message sender is allowed to spend from the _from account.
        
        //makes sure the _from balance has the value that the spender wants to transfer and the spender allowance is also greater than the value. 
         require(balances[_from] >= _value && allowance >= _value);
         
         
        balances[_to] += _value;
        balances[_from] -= _value;
        
        if (allowance < MAX_UINT256) {   //this condition will always meet unless the spender's allowance is limitless.
            allowed[_from][msg.sender] -= _value;
        }
     
    }    
   
   //this function give the spender address some amount of tokens to spend fron the balance of the msg sender.
    function approve(address _spender, uint256 _value) public  {
        allowed[msg.sender][_spender] = _value;
     
    }
    
    
        // this function receives some amount of ethers and set tokens to the sender address
    function getTokens() public payable { 
    
    
         //check if the amount of wei sent is more than the value required in one token.  
        // if the condition is not met, require will throw an error.
        require(msg.value >= tokenValue);  
        
       // calculate the number of tokens to be put in sender balance.
        uint _tokensNo = msg.value/tokenValue; 
 
        balances[Owner] -= _tokensNo;
        balances[msg.sender] += tokensNo;

        
    }
    
    //this function returns the ether balance of the message sender.
    function getBalance() public returns (uint256 balance){
        return msg.sender.balance;

    }

    // this function receives some amount of tokens, and sends ethers  to the message sender.
    function getEthers(uint256 tokens) public  {
        require(tokens >= 1);
        uint _ethers = tokens*tokenValue;
        
        //make sure that this contract account has the amount of ether that is about to be sent.
        require(this.balance >= _ethers);

        balances[Owner] += tokens;
        balances[msg.sender] -= tokens;
        
        msg.sender.transfer(_ethers); 
    }

    
}
