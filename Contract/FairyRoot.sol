pragma solidity ^0.4.6;

// Fairy Root 정보
// 신규 요정을 생성합니다.
contract FairyRoot {
	address public owner;
	
	// 소유자를 등록합니다.
	function FairyRoot() {
		owner = msg.sender;
	}
	
	// 소유자만 처리 가능
	modifier onlyOwner {
		require(msg.sender == owner);
		_;
	}
	
	// 소유자를 변경합니다.
	function transferOwnership(address newOwner) onlyOwner {
		if (newOwner != address(0)) {
			owner = newOwner;
		}
	}
}