pragma solidity ^0.4.6;

contract Test {
	mapping (address => string[]) public names;
	
	function pushName(string name) public {
        names[msg.sender].push(name);
    }
    
    function getName(uint256 index) constant returns (string) {
    	return names[msg.sender][index];
    }
}