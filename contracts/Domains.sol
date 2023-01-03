// SPDX-License-Identifier:MIT

pragma solidity ^0.8.17;

import "hardhat/console.sol";
import {StringUtils} from "./libraries/StringUtils.sol";

contract Domains {

  //Domain TLD
  string public tld;

  //To store their names 
  mapping(string=>address) public domains;

  //New mapping for storing value 
  mapping(string => string) public records;

  //Make our contract payable by adding tld to the constructor 
  constructor(string memory _tld) payable {
    tld = _tld;
    console.log("%s name service deployed",_tld);
  }

  //Function to give price of domain based on domain length 
  function price(string calldata name)public pure returns(uint){
    uint len = StringUtils.strlen(name);
    require(len>0);
    if (len == 3){
      return 5 * 10**17;// 5 matic
    }
    else if (len == 4){
      return 3 * 10**17;
    }
    else {
      return 1 * 10**17;
    }
  }

  /*As we have made a price function then now we also had to make our register 
  function payable by adding "payable" modifier */
  //A register function that adds their name to our mapping
  function register(string calldata name) public payable {
    require(domains[name] == address(0));

    uint _price = price(name);

    //check if enough matic for the certain domain name was paid int the transaction 
    require (msg.value >= _price, "Not enough Matic is paid");
    
    domains[name] = msg.sender;
    console.log ("%s has registered a doamin!",msg.sender);
  }

  // This will give us the domain owners' address
  function getAddress(string calldata name) public view returns (address){
    return domains[name];
  }

  function setRecord(string calldata name, string calldata record) public{ 
    //checks that ownner is the transaction sender
  require(domains[name] == msg.sender);
    records[name] = record;
  }

  function getRecord(string calldata name) public view returns(string memory){
    return(records[name]);
  }
   
}