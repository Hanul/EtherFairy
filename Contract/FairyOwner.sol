pragma solidity ^0.4.6;

// 요정 소유자 정보
// 이름을 저장합니다.
contract FairyOwner {
	mapping (address => string) public names;
	
	function saveName(string name) public {
        names[msg.sender] = name;
    }
}