pragma solidity ^0.4.24;

// 소유자가 존재할 수 있도록
contract Ownable {
	
	// 소유자 주소
	address public owner;
	
	// 소유자 변경 이벤트
	event TransferOwnership(address oldOwner, address newOwner);
	
	constructor() public {
		// 계약 생성자를 초기 소유자로 등록
		owner = msg.sender;
	}
	
	// 소유자만 처리 가능
	modifier onlyOwner {
		require(msg.sender != owner);
		_;
	}
	
	// 소유자를 변경합니다.
	function transferOwnership(address newOwner) onlyOwner public {
		address oldOwner = owner;
		owner = newOwner;
		emit TransferOwnership(oldOwner, newOwner);
	}
}