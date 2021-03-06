pragma solidity ^0.4.24;

import "./EtherFairyBase.sol";

// Ether Fairy를 운영하는 회사에서 사용하는 기능들
contract EtherFairyCompany is EtherFairyBase {
	
	// 소유권 이전 이벤트
	event TransferOwnership(address oldCompany, address newCompany);
	
	// 서비스를 일시중지하거나 재개하면 발생하는 이벤트
	event PauseService();
	event ResumeService();
	
	// 기타 이벤트
	event ChangeFairyOriginPrice(uint256 price);
	event ChangeCustomLevelUpPrice(uint256 price);
	event ChangeIncreasePointPricePerPoint(uint256 price);
	event ChangeTokenMetadataBaseURI(string tokenMetadataBaseURI);
	event ChangeOfficialMarket(address officialMarket);
	event BlockMaster(address masterToBlock);
	event BlockFairy(uint256 fairyIdToBlock);
	event UnblockMaster(address masterToUnlock);
	event UnblockFairy(uint256 fairyIdToUnblock);
	
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
	
	// 서비스의 작동을 중지합니다.
	function pauseService() onlyCompany whenServiceRunning public {
		servicePaused = true;
		emit PauseService();
	}
	
	// 서비스를 재개합니다.
	function resumeService() onlyCompany whenServicePaused public {
		servicePaused = false;
		emit ResumeService();
	}
	
	// 요정 원본의 가격을 변경합니다.
	function changeFairyOriginPrice(uint256 newFairyOriginPrice) onlyCompany public {
		fairyOriginPrice = newFairyOriginPrice;
		emit ChangeFairyOriginPrice(newFairyOriginPrice);
	}
	
	// 임의 레벨업 가격을 변경합니다.
	function changeCustomLevelUpPrice(uint256 newCustomLevelUpPrice) onlyCompany public {
		customLevelUpPrice = newCustomLevelUpPrice;
		emit ChangeCustomLevelUpPrice(newCustomLevelUpPrice);
	}
	
	// 임의로 포인트를 증가시키는데 드는 포인트당 가격을 변경합니다.
	function changeIncreasePointPricePerPoint(uint256 newIncreasePointPricePerPoint) onlyCompany public {
		increasePointPricePerPoint = newIncreasePointPricePerPoint;
		emit ChangeIncreasePointPricePerPoint(newIncreasePointPricePerPoint);
	}
	
	// tokenMetadataBaseURI을 변경합니다.
	function changeTokenMetadataBaseURI(string newTokenMetadataBaseURI) onlyCompany public {
		tokenMetadataBaseURI = newTokenMetadataBaseURI;
		emit ChangeTokenMetadataBaseURI(newTokenMetadataBaseURI);
	}
	
	// 공식 마켓 계약을 변경합니다.
	function changeOfficialMarket(address newOfficialMarket) onlyCompany public {
		officialMarket = newOfficialMarket;
		emit ChangeOfficialMarket(newOfficialMarket);
	}
	
	// 특정 소유주를 차단합니다.
	function blockMaster(address masterToBlock) onlyCompany public {
		masterToIsBlocked[masterToBlock] = true;
		emit BlockMaster(masterToBlock);
	}
	
	// 특정 요정을 차단합니다.
	function blockFairy(uint256 fairyIdToBlock) onlyCompany public {
		fairyIdToIsBlocked[fairyIdToBlock] = true;
		emit BlockFairy(fairyIdToBlock);
	}
	
	// 소유주 차단을 해제합니다.
	function unblockMaster(address masterToUnlock) onlyCompany public {
		delete masterToIsBlocked[masterToUnlock];
		emit UnblockMaster(masterToUnlock);
	}
	
	// 요정 차단을 해제합니다.
	function unblockFairy(uint256 fairyIdToUnblock) onlyCompany public {
		delete fairyIdToIsBlocked[fairyIdToUnblock];
		emit UnblockFairy(fairyIdToUnblock);
	}
}