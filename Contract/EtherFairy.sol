pragma solidity ^0.4.6;

import "./Ownable.sol";

// Ether Fairy 스마트 계약
contract EtherFairy is Ownable {
	
	// 요정 원본의 가격
	uint public fairyOriginPrice;
	
	// 회원 별 요정 목록
	mapping(address => Fairy[]) internal fairyMap;
	
	// 요정 정보
	struct Fairy {
		
		// 회사 서버에 저장된 요정 ID
		string fairyId;
		
		// 탄생 시간
		uint birthTime;
		
		// 추가된 레벨
		uint appendedLevel;
		
		// 기본 속성에 대한 레벨 당 증가 포인트들
		uint hpPointPerLevel;
		uint attackPointPerLevel;
		uint defensePointPerLevel;
		uint agilityPointPerLevel;
		uint dexterityPointPerLevel;
		
		// 원소 속성에 대한 레벨 당 증가 포인트들
		uint firePointPerLevel;
		uint waterPointPerLevel;
		uint windPointPerLevel;
		uint earthPointPerLevel;
		uint lightPointPerLevel;
		uint darkPointPerLevel;
	}
	
	// 스마트 계약을 생성하며 요정 원본의 초기 가격을 지정합니다.
	function EtherFairy(uint initialFairyOriginPrice) Ownable() {
		fairyOriginPrice = initialFairyOriginPrice;
	}
	
	// 요정 원본의 가격을 수정합니다.
	function changeFairyOriginPrice(uint newFairyOriginPrice) onlyOwner {
		fairyOriginPrice = newFairyOriginPrice;
	}
	
	// 요정을 탄생시킵니다.
	function birthFairy(
		
		// 회사 서버에 저장된 요정 ID
		string fairyId,
		
		// 요정 디자이너의 지갑 주소
		address designer,
		
		// 탄생 시간
		uint birthTime,
		
		// 추가된 레벨
		uint appendedLevel,
		
		// 원소 속성에 대한 레벨 당 증가 포인트들
		uint firePointPerLevel,
		uint waterPointPerLevel,
		uint windPointPerLevel,
		uint earthPointPerLevel,
		uint lightPointPerLevel,
		uint darkPointPerLevel
		)
		
		// 송금 가능
		payable {
		
		// 초기 요정의 가격은 0.01 이더입니다.
		if (msg.value != fairyOriginPrice) {
			throw;
		}
		
		// 초기0 속성 값들의 총합은 5가 되어야 합니다.
		else if (firePointPerLevel + waterPointPerLevel + windPointPerLevel + earthPointPerLevel + lightPointPerLevel + darkPointPerLevel != 5) {
			throw;
		}
		
		else {
			
			fairyMap[msg.sender].push(Fairy({
				
				fairyId : fairyId,
				
				birthTime : birthTime,
				
				appendedLevel : appendedLevel,
				
				// EVM의 특성 상 너무 많은 변수를 한번에 할당 할 수 없으므로,
				// 기본 속성은 1로 통일하여 지정합니다.
				hpPointPerLevel : 1,
				attackPointPerLevel : 1,
				defensePointPerLevel : 1,
				agilityPointPerLevel : 1,
				dexterityPointPerLevel : 1,
				
				firePointPerLevel : firePointPerLevel,
				waterPointPerLevel : waterPointPerLevel,
				windPointPerLevel : windPointPerLevel,
				earthPointPerLevel : earthPointPerLevel,
				lightPointPerLevel : lightPointPerLevel,
				darkPointPerLevel : darkPointPerLevel
			}));
		}
	}
	
	// 요정의 기본 정보를 반환합니다.
	function getFairyBasicInfo(address user, uint fairyIndex) constant returns (
		string fairyId,
		uint birthTime,
		uint appendedLevel) {
		
		Fairy fairy = fairyMap[user][fairyIndex];
		
		return (
			fairy.fairyId,
			fairy.birthTime,
			fairy.appendedLevel
		);
	}
	
	// 요정의 기본 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
	function getFairyBasicPointsPerLevel(address user, uint fairyIndex) constant returns (
		uint hpPointPerLevel,
		uint attackPointPerLevel,
		uint defensePointPerLevel,
		uint agilityPointPerLevel,
		uint dexterityPointPerLevel) {
		
		Fairy fairy = fairyMap[user][fairyIndex];
		
		return (
			fairy.hpPointPerLevel,
			fairy.attackPointPerLevel,
			fairy.defensePointPerLevel,
			fairy.agilityPointPerLevel,
			fairy.dexterityPointPerLevel
		);
	}
	
	// 요정의 원소 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
	function getFairyElementPointsPerLevel(address user, uint fairyIndex) constant returns (
		uint firePointPerLevel,
		uint waterPointPerLevel,
		uint windPointPerLevel,
		uint earthPointPerLevel,
		uint lightPointPerLevel,
		uint darkPointPerLevel) {
		
		Fairy fairy = fairyMap[user][fairyIndex];
		
		return (
			fairy.firePointPerLevel,
			fairy.waterPointPerLevel,
			fairy.windPointPerLevel,
			fairy.earthPointPerLevel,
			fairy.lightPointPerLevel,
			fairy.darkPointPerLevel
		);
	}
	
	// 요정 소유 개수를 반환합니다.
	function getFairyCount(address user) constant returns (uint count) {
		return fairyMap[user].length;
	}
	
	//TODO: 요정을 장터에 등록합니다.
	
	//TODO: 요정을 장터에서 내립니다.
	
	//TODO: 요정을 구매합니다.
	
	//TODO: 스마트 계약 업그레이드를 고려해야합니다.
}