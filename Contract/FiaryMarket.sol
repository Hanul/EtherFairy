pragma solidity ^0.4.24;

import "./ERC/ERC721.sol";
	
contract EtherFairyCompany {
	
	// 소유권 이전 이벤트
	event TransferOwnership(address oldCompany, address newCompany);
	
	// 마켓을 일시중지하거나 재개하면 발생하는 이벤트
	event PauseMarket();
	event ResumeMarket();
	
	// 회사의 지갑 주소
	address public company;
	
	constructor() public {
		// 계약 생성자를 초기 회사로 등록
		company = msg.sender;
	}
	
	// 마켓이 일시중지 상태인지
	bool public marketPaused = false;
	
	// 마켓이 구동중일때만
	modifier whenMarketRunning() {
		require(marketPaused != true);
		_;
	}
	
	// 마켓이 일시정지 상태일때만
	modifier whenMarketPaused() {
		require(marketPaused == true);
		_;
	}
	
	// 회사만 처리 가능
	modifier onlyCompany {
		require(msg.sender == company);
		_;
	}
	
	// 소유권을 이전합니다.
	function transferOwnership(address newCompany) onlyCompany public {
		address oldCompany = company;
		company = newCompany;
		emit TransferOwnership(oldCompany, newCompany);
	}
	
	// 마켓의 작동을 중지합니다.
	function pauseMarket() onlyCompany whenMarketRunning public {
		marketPaused = true;
		emit PauseMarket();
	}
	
	// 마켓을 재개합니다.
	function resumeMarket() onlyCompany whenMarketPaused public {
		marketPaused = false;
		emit ResumeMarket();
	}
	
	//TODO: 요정을 장터에 등록합니다.
	
	//TODO: 요정을 장터에서 내립니다.
	
	//TODO: 요정을 구매합니다.
}