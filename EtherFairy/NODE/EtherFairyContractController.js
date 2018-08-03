EtherFairy.EtherFairyContractController = OBJECT({

	init : (inner, self) => {
		
		let contract;
		let setContract = self.setContract = (_contract) => {
			contract = _contract;
		};
		
		let func = (f) => {
			return function() {
				f.apply(undefined, arguments);
			};
		};
		
		let callbackWrapper = (callback) => {
			return (error, result) => {
				
				// 계약 실행 오류 발생
				if (error !== TO_DELETE) {
					alert(error.toString());
				}
				
				// 정상 작동
				else if (CHECK_IS_ARRAY(result) === true) {
					EACH(result, (value, i) => {
						if (value.toNumber !== undefined) {
							result[i] = value.toNumber();
						}
					});
					callback.apply(undefined, result);
				}
				
				else {
					if (result.toNumber !== undefined) {
						result = result.toNumber();
					}
					callback(result);
				}
			};
		};
		
		// 토큰의 이름 반환
		let name = self.name = func((callback) => {
			contract.methods.name().call(callbackWrapper(callback));
		});
		
		// 토큰의 심볼 반환
		let symbol = self.symbol = func((callback) => {
			contract.methods.symbol().call(callbackWrapper(callback));
		});
		
		// 요정 정보의 메타데이터를 가져오는 경로를 반환합니다.
		let tokenURI = self.tokenURI = func((fairyId, callback) => {
			contract.methods.tokenURI(fairyId).call(callbackWrapper(callback));
		});
		
		// 소유권을 이전합니다.
		let transferOwnership = self.transferOwnership = func((newCompany, callback) => {
			contract.methods.transferOwnership(newCompany).call(callbackWrapper(callback));
		});
		
		// 서비스의 작동을 중지합니다.
		let pauseService = self.pauseService = func((callback) => {
			contract.methods.pauseService().call(callbackWrapper(callback));
		});
		
		// 서비스를 재개합니다.
		let resumeService = self.resumeService = func((callback) => {
			contract.methods.resumeService().call(callbackWrapper(callback));
		});
		
		// 요정 원본의 가격을 변경합니다.
		let changeFairyOriginPrice = self.changeFairyOriginPrice = func((newFairyOriginPrice, callback) => {
			contract.methods.changeFairyOriginPrice(newFairyOriginPrice).call(callbackWrapper(callback));
		});
		
		// 임의 레벨업 가격을 변경합니다.
		let changeCustomLevelUpPrice = self.changeCustomLevelUpPrice = func((newCustomLevelUpPrice, callback) => {
			contract.methods.changeCustomLevelUpPrice(newCustomLevelUpPrice).call(callbackWrapper(callback));
		});
		
		// 임의로 포인트를 증가시키는데 드는 포인트당 가격을 변경합니다.
		let changeIncreasePointPricePerPoint = self.changeIncreasePointPricePerPoint = func((newIncreasePointPricePerPoint, callback) => {
			contract.methods.changeIncreasePointPricePerPoint(newIncreasePointPricePerPoint).call(callbackWrapper(callback));
		});
		
		// tokenMetadataBaseURI을 변경합니다.
		let changeTokenMetadataBaseURI = self.changeTokenMetadataBaseURI = func((newTokenMetadataBaseURI, callback) => {
			contract.methods.changeTokenMetadataBaseURI(newTokenMetadataBaseURI).call(callbackWrapper(callback));
		});
		
		// 특정 소유주를 차단합니다.
		let blockMaster = self.blockMaster = func((masterToBlock, callback) => {
			contract.methods.blockMaster(masterToBlock).call(callbackWrapper(callback));
		});
		
		// 특정 요정을 차단합니다.
		let blockFairy = self.blockFairy = func((fairyIdToBlock, callback) => {
			contract.methods.blockFairy(fairyIdToBlock).call(callbackWrapper(callback));
		});
		
		// 소유주 차단을 해제합니다.
		let unblockMaster = self.unblockMaster = func((masterToBlock, callback) => {
			contract.methods.unblockMaster(masterToBlock).call(callbackWrapper(callback));
		});
		
		// 요정 차단을 해제합니다.
		let unblockFairy = self.unblockFairy = func((fairyIdToBlock, callback) => {
			contract.methods.unblockFairy(fairyIdToBlock).call(callbackWrapper(callback));
		});
		
		// 요정의 개수를 가져옵니다.
		let balanceOf = self.balanceOf = func((master, callback) => {
			contract.methods.balanceOf(master).call(callbackWrapper(callback));
		});
		
		// 요정의 소유주 지갑 주소를 가져옵니다.
		let ownerOf = self.ownerOf = func((fairyId, callback) => {
			contract.methods.ownerOf(fairyId).call(callbackWrapper(callback));
		});
		
		// 주어진 주소가 스마트 계약인지 확인합니다.
		let checkIsSmartContract = self.checkIsSmartContract = func((addr, callback) => {
			contract.methods.checkIsSmartContract(addr).call(callbackWrapper(callback));
		});
		
		// 요정을 받는 대상이 스마트 계약인 경우, onERC721Received 함수를 실행합니다.
		let safeTransferFromData = self.safeTransferFromData = func((from, to, fairyId, data, callback) => {
			contract.methods.safeTransferFrom(from, to, fairyId, data).call(callbackWrapper(callback));
		});
		
		// 요정을 받는 대상이 스마트 계약인 경우, onERC721Received 함수를 실행합니다.
		let safeTransferFrom = self.safeTransferFrom = func((from, to, fairyId, callback) => {
			contract.methods.safeTransferFrom(from, to, fairyId).call(callbackWrapper(callback));
		});
		
		// 요정을 이전합니다.
		let transferFrom = self.transferFrom = func((from, to, fairyId, callback) => {
			contract.methods.transferFrom(from, to, fairyId).call(callbackWrapper(callback));
		});
		
		// 특정 지갑에 거래 권한을 부여합니다.
		let approve = self.approve = func((approved, fairyId, callback) => {
			contract.methods.approve(approved, fairyId).call(callbackWrapper(callback));
		});
		
		// 오퍼레이터에게 거래 권한을 부여하거나 뺏습니다.
		let setApprovalForAll = self.setApprovalForAll = func((operator, isApproved, callback) => {
			contract.methods.setApprovalForAll(operator, isApproved).call(callbackWrapper(callback));
		});
		
		// 요정 거래 권한이 승인된 지갑 주소를 가져옵니다.
		let getApproved = self.getApproved = func((fairyId, callback) => {
			contract.methods.getApproved(fairyId).call(callbackWrapper(callback));
		});
		
		// 오퍼레이터가 소유주의 거래 권한을 가지고 있는지 확인합니다.
		let isApprovedForAll = self.isApprovedForAll = func((master, operator, callback) => {
			contract.methods.isApprovedForAll(master, operator).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨업 합니다.
		let levelUpFairy = self.levelUpFairy = func((fairyId, callback) => {
			contract.methods.levelUpFairy(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 HP 증가 포인트를 올립니다.
		let increaseHPPointPerLevel = self.increaseHPPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseHPPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 공격 증가 포인트를 올립니다.
		let increaseAttackPointPerLevel = self.increaseAttackPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseAttackPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 방어 증가 포인트를 올립니다.
		let increaseDefensePointPerLevel = self.increaseDefensePointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseDefensePointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 민첩 증가 포인트를 올립니다.
		let increaseAgilityPointPerLevel = self.increaseAgilityPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseAgilityPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 재치 증가 포인트를 올립니다.
		let increaseDexterityPointPerLevel = self.increaseDexterityPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseDexterityPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 불 속성 증가 포인트를 올립니다.
		let increaseFirePointPerLevel = self.increaseFirePointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseFirePointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 물 속성 증가 포인트를 올립니다.
		let increaseWaterPointPerLevel = self.increaseWaterPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseWaterPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 바람 속성 증가 포인트를 올립니다.
		let increaseWindPointPerLevel = self.increaseWindPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseWindPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 대지 속성 증가 포인트를 올립니다.
		let increaseEarthPointPerLevel = self.increaseEarthPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseEarthPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 빛 속성 증가 포인트를 올립니다.
		let increaseLightPointPerLevel = self.increaseLightPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseLightPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 어둠 속성 증가 포인트를 올립니다.
		let increaseDarkPointPerLevel = self.increaseDarkPointPerLevel = func((fairyId, callback) => {
			contract.methods.increaseDarkPointPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 요정을 탄생시킵니다.
		let birthFairy = self.birthFairy = func((fairyOriginId, designer, name, firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel, callback) => {
			contract.methods.birthFairy(fairyOriginId, designer, name, firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel).call(callbackWrapper(callback));
		});
		
		// 요정의 이름을 변경합니다.
		let changeFairyName = self.changeFairyName = func((fairyId, newName, callback) => {
			contract.methods.changeFairyName(fairyId, newName).call(callbackWrapper(callback));
		});
		
		// 요정의 개수를 반환합니다.
		let getFairyCount = self.getFairyCount = func((callback) => {
			contract.methods.getFairyCount().call(callbackWrapper(callback));
		});
		
		// 소유주 계정의 개수를 반환합니다.
		let getMasterCount = self.getMasterCount = func((callback) => {
			contract.methods.getMasterCount().call(callbackWrapper(callback));
		});
		
		// 소유주 계정의 주소를 반환합니다.
		let getMasterAddress = self.getMasterAddress = func((index, callback) => {
			contract.methods.masters(index).call(callbackWrapper(callback));
		});
		
		// 소유주의 요정 ID를 반환합니다.
		let getFairyId = self.getFairyId = func((masterId, index, callback) => {
			contract.methods.masterToFairyIds(masterId, index).call(callbackWrapper(callback));
		});
		
		// 요정의 기본 정보를 반환합니다.
		let getFairyBasicInfo = self.getFairyBasicInfo = func((fairyId, callback) => {
			contract.methods.getFairyBasicInfo(fairyId).call(callbackWrapper(callback));
		});
		
		// 요정의 기본 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
		let getFairyBasicPointsPerLevel = self.getFairyBasicPointsPerLevel = func((fairyId, callback) => {
			contract.methods.getFairyBasicPointsPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 요정의 원소 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
		let getFairyElementPointsPerLevel = self.getFairyElementPointsPerLevel = func((fairyId, callback) => {
			contract.methods.getFairyElementPointsPerLevel(fairyId).call(callbackWrapper(callback));
		});
		
		// 주어진 인터페이스가 구현되어 있는지 확인합니다.
		let supportsInterface = self.supportsInterface = func((interfaceID, callback) => {
			contract.methods.supportsInterface(interfaceID).call(callbackWrapper(callback));
		});
	}
});
