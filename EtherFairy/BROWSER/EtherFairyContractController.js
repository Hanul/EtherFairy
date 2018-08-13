EtherFairy.EtherFairyContractController = OBJECT({

	init : (inner, self) => {
		
		let contract;
		let eventMap = {};
		
		let setContract = self.setContract = (_contract) => {
			contract = _contract;
			
			contract.allEvents((error, info) => {
				
				if (error === TO_DELETE) {
					
					let eventHandlers = eventMap[info.event];
		
					if (eventHandlers !== undefined) {
						EACH(eventHandlers, (eventHandler) => {
							eventHandler(info.args);
						});
					}
				}
			});
		};
		
		let func = (f) => {
			return function() {
				if (EtherFairy.WalletManager.checkIsEnable() !== true) {
					EtherFairy.CreateInstallProviderPopup();
				} else {
					f.apply(undefined, arguments);
				}
			};
		};
		
		let callbackWrapper = (callbackOrHandlers) => {
			
			let callback;
			let errorHandler;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			return (error, result) => {
				
				// 계약 실행 오류 발생
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					} else {
						alert(error.toString());
					}
				}
				
				// 정상 작동
				else if (CHECK_IS_ARRAY(result) === true) {
					EACH(result, (value, i) => {
						if (value.toNumber !== undefined) {
							result[i] = value.toNumber();
						}
					});
					callback(result);
				}
				
				else {
					if (result.toNumber !== undefined) {
						result = result.toNumber();
					}
					callback(result);
				}
			};
		};
		
		let toStringCallbackWrapper = (callbackOrHandlers) => {
			
			let callback;
			let errorHandler;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			return (error, result) => {
				
				// 계약 실행 오류 발생
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					} else {
						alert(error.toString());
					}
				}
				
				// 정상 작동
				else if (CHECK_IS_ARRAY(result) === true) {
					EACH(result, (value, i) => {
						if (value.toNumber !== undefined) {
							result[i] = value.toString(10);
						}
					});
					callback(result);
				}
				
				else {
					if (result.toNumber !== undefined) {
						result = result.toString(10);
					}
					callback(result);
				}
			};
		};
		
		let transactionCallbackWrapper = (callbackOrHandlers) => {
			
			let callback;
			let errorHandler;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				callback = callbackOrHandlers.success;
				errorHandler = callbackOrHandlers.error;
			}
			
			return (error, result) => {
				
				// 계약 실행 오류 발생
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					} else {
						alert(error.toString());
					}
				}
				
				// 정상 작동
				else if (callback !== undefined) {
					
					let retry = RAR(() => {
						
						web3.eth.getTransactionReceipt(result, (error, result) => {
							
							// 트랜잭선 오류 발생
							if (error !== TO_DELETE) {
								if (errorHandler !== undefined) {
									errorHandler(error.toString());
								} else {
									alert(error.toString());
								}
							}
							
							// 아무런 값이 없으면 재시도
							else if (result === TO_DELETE) {
								retry();
							}
							
							// 트랜잭션 완료
							else {
								callback();
							}
						});
					});
				}
			};
		};
		
		let on = self.on = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//REQUIRED: eventHandler
			
			if (eventMap[eventName] === undefined) {
				eventMap[eventName] = [];
			}

			eventMap[eventName].push(eventHandler);
		};

		let off = self.off = (eventName, eventHandler) => {
			//REQUIRED: eventName
			//OPTIONAL: eventHandler

			if (eventMap[eventName] !== undefined) {

				if (eventHandler !== undefined) {

					REMOVE({
						array: eventMap[eventName],
						value: eventHandler
					});
				}

				if (eventHandler === undefined || eventMap[eventName].length === 0) {
					delete eventMap[eventName];
				}
			}
		};
		
		// 토큰의 이름 반환
		let name = self.name = func((callback) => {
			contract.name(callbackWrapper(callback));
		});
		
		// 토큰의 심볼 반환
		let symbol = self.symbol = func((callback) => {
			contract.symbol(callbackWrapper(callback));
		});
		
		// 요정 정보의 메타데이터를 가져오는 경로를 반환합니다.
		let tokenURI = self.tokenURI = func((fairyId, callback) => {
			contract.tokenURI(fairyId, callbackWrapper(callback));
		});
		
		// 회사의 지갑 주소를 반환합니다.
		let getCompanyAddress = self.getCompanyAddress = func((callback) => {
			contract.company(callbackWrapper(callback));
		});
		
		// 소유권을 이전합니다.
		let transferOwnership = self.transferOwnership = func((newCompany, callback) => {
			contract.transferOwnership(newCompany, transactionCallbackWrapper(callback));
		});
		
		// 서비스의 작동을 중지합니다.
		let pauseService = self.pauseService = func((callback) => {
			contract.pauseService(transactionCallbackWrapper(callback));
		});
		
		// 서비스를 재개합니다.
		let resumeService = self.resumeService = func((callback) => {
			contract.resumeService(transactionCallbackWrapper(callback));
		});
		
		// 요정 원본의 가격을 변경합니다.
		let changeFairyOriginPrice = self.changeFairyOriginPrice = func((newFairyOriginPrice, callback) => {
			contract.changeFairyOriginPrice(web3.toWei(newFairyOriginPrice, 'ether'), transactionCallbackWrapper(callback));
		});
		
		// 임의 레벨업 가격을 변경합니다.
		let changeCustomLevelUpPrice = self.changeCustomLevelUpPrice = func((newCustomLevelUpPrice, callback) => {
			contract.changeCustomLevelUpPrice(web3.toWei(newCustomLevelUpPrice, 'ether'), callbackWrapper(callback));
		});
		
		// 임의로 포인트를 증가시키는데 드는 포인트당 가격을 변경합니다.
		let changeIncreasePointPricePerPoint = self.changeIncreasePointPricePerPoint = func((newIncreasePointPricePerPoint, callback) => {
			contract.changeIncreasePointPricePerPoint(web3.toWei(newIncreasePointPricePerPoint, 'ether'), callbackWrapper(callback));
		});
		
		// tokenMetadataBaseURI을 변경합니다.
		let changeTokenMetadataBaseURI = self.changeTokenMetadataBaseURI = func((newTokenMetadataBaseURI, callback) => {
			contract.changeTokenMetadataBaseURI(newTokenMetadataBaseURI, transactionCallbackWrapper(callback));
		});
		
		// 공식 마켓 계약을 변경합니다.
		let changeOfficialMarket = self.changeOfficialMarket = func((officialMarket, callback) => {
			contract.changeOfficialMarket(officialMarket, transactionCallbackWrapper(callback));
		});
		
		// 특정 소유주를 차단합니다.
		let blockMaster = self.blockMaster = func((masterToBlock, callback) => {
			contract.blockMaster(masterToBlock, transactionCallbackWrapper(callback));
		});
		
		// 특정 요정을 차단합니다.
		let blockFairy = self.blockFairy = func((fairyIdToBlock, callback) => {
			contract.blockFairy(fairyIdToBlock, transactionCallbackWrapper(callback));
		});
		
		// 소유주 차단을 해제합니다.
		let unblockMaster = self.unblockMaster = func((masterToBlock, callback) => {
			contract.unblockMaster(masterToBlock, transactionCallbackWrapper(callback));
		});
		
		// 요정 차단을 해제합니다.
		let unblockFairy = self.unblockFairy = func((fairyIdToBlock, callback) => {
			contract.unblockFairy(fairyIdToBlock, transactionCallbackWrapper(callback));
		});
		
		// 요정의 개수를 가져옵니다.
		let balanceOf = self.balanceOf = func((master, callback) => {
			contract.balanceOf(master, callbackWrapper(callback));
		});
		
		// 요정의 소유주 지갑 주소를 가져옵니다.
		let ownerOf = self.ownerOf = func((fairyId, callback) => {
			contract.ownerOf(fairyId, callbackWrapper(callback));
		});
		
		// 주어진 주소가 스마트 계약인지 확인합니다.
		let checkIsSmartContract = self.checkIsSmartContract = func((addr, callback) => {
			contract.checkIsSmartContract(addr, callbackWrapper(callback));
		});
		
		// 요정을 받는 대상이 스마트 계약인 경우, onERC721Received 함수를 실행합니다.
		let safeTransferFromData = self.safeTransferFromData = func((from, to, fairyId, data, callback) => {
			contract.safeTransferFrom(from, to, fairyId, data, transactionCallbackWrapper(callback));
		});
		
		// 요정을 받는 대상이 스마트 계약인 경우, onERC721Received 함수를 실행합니다.
		let safeTransferFrom = self.safeTransferFrom = func((from, to, fairyId, callback) => {
			contract.safeTransferFrom(from, to, fairyId, transactionCallbackWrapper(callback));
		});
		
		// 요정을 이전합니다.
		let transferFrom = self.transferFrom = func((from, to, fairyId, callback) => {
			contract.transferFrom(from, to, fairyId, transactionCallbackWrapper(callback));
		});
		
		// 특정 지갑에 거래 권한을 부여합니다.
		let approve = self.approve = func((approved, fairyId, callback) => {
			contract.approve(approved, fairyId, transactionCallbackWrapper(callback));
		});
		
		// 오퍼레이터에게 거래 권한을 부여하거나 뺏습니다.
		let setApprovalForAll = self.setApprovalForAll = func((operator, isApproved, callback) => {
			contract.setApprovalForAll(operator, isApproved, transactionCallbackWrapper(callback));
		});
		
		// 요정 거래 권한이 승인된 지갑 주소를 가져옵니다.
		let getApproved = self.getApproved = func((fairyId, callback) => {
			contract.getApproved(fairyId, callbackWrapper(callback));
		});
		
		// 오퍼레이터가 소유주의 거래 권한을 가지고 있는지 확인합니다.
		let isApprovedForAll = self.isApprovedForAll = func((master, operator, callback) => {
			contract.isApprovedForAll(master, operator, callbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨업 합니다.
		let levelUpFairy = self.levelUpFairy = func((fairyId, callback) => {
			contract.levelUpFairy(fairyId, {
				value : web3.toWei(0.01, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 HP 증가 포인트를 올립니다.
		let increaseHPPointPerLevel = self.increaseHPPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseHPPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * now, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 공격 증가 포인트를 올립니다.
		let increaseAttackPointPerLevel = self.increaseAttackPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseAttackPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * now, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 방어 증가 포인트를 올립니다.
		let increaseDefensePointPerLevel = self.increaseDefensePointPerLevel = func((fairyId, now, callback) => {
			contract.increaseDefensePointPerLevel(fairyId, {
				value : web3.toWei(0.01 * now, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 민첩 증가 포인트를 올립니다.
		let increaseAgilityPointPerLevel = self.increaseAgilityPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseAgilityPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * now, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 재치 증가 포인트를 올립니다.
		let increaseDexterityPointPerLevel = self.increaseDexterityPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseDexterityPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * now, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 불 속성 증가 포인트를 올립니다.
		let increaseFirePointPerLevel = self.increaseFirePointPerLevel = func((fairyId, now, callback) => {
			contract.increaseFirePointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 물 속성 증가 포인트를 올립니다.
		let increaseWaterPointPerLevel = self.increaseWaterPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseWaterPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 바람 속성 증가 포인트를 올립니다.
		let increaseWindPointPerLevel = self.increaseWindPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseWindPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 대지 속성 증가 포인트를 올립니다.
		let increaseEarthPointPerLevel = self.increaseEarthPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseEarthPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 빛 속성 증가 포인트를 올립니다.
		let increaseLightPointPerLevel = self.increaseLightPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseLightPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 돈을 지불하고 레벨 당 어둠 속성 증가 포인트를 올립니다.
		let increaseDarkPointPerLevel = self.increaseDarkPointPerLevel = func((fairyId, now, callback) => {
			contract.increaseDarkPointPerLevel(fairyId, {
				value : web3.toWei(0.01 * (now + 1), 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 요정을 탄생시킵니다.
		let birthFairy = self.birthFairy = func((fairyOriginId, designer, name, firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel, callback) => {
			contract.birthFairy(fairyOriginId, designer, name, firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel, {
				value : web3.toWei(0.01, 'ether')
			}, transactionCallbackWrapper(callback));
		});
		
		// 요정의 이름을 변경합니다.
		let changeFairyName = self.changeFairyName = func((fairyId, newName, callback) => {
			contract.changeFairyName(fairyId, newName, transactionCallbackWrapper(callback));
		});
		
		// 요정의 개수를 반환합니다.
		let getFairyCount = self.getFairyCount = func((callback) => {
			contract.getFairyCount(callbackWrapper(callback));
		});
		
		// 소유주 계정의 개수를 반환합니다.
		let getMasterCount = self.getMasterCount = func((callback) => {
			contract.getMasterCount(callbackWrapper(callback));
		});
		
		// 소유주 계정의 주소를 반환합니다.
		let getMasterAddress = self.getMasterAddress = func((index, callback) => {
			contract.masters(index, callbackWrapper(callback));
		});
		
		// 소유주의 요정 ID를 반환합니다.
		let getFairyId = self.getFairyId = func((masterId, index, callback) => {
			contract.masterToFairyIds(masterId, index, callbackWrapper(callback));
		});
		
		// 요정의 기본 정보를 반환합니다.
		let getFairyBasicInfo = self.getFairyBasicInfo = func((fairyId, callback) => {
			contract.getFairyBasicInfo(fairyId, callbackWrapper(callback));
		});
		
		// 요정의 기본 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
		let getFairyBasicPointsPerLevel = self.getFairyBasicPointsPerLevel = func((fairyId, callback) => {
			contract.getFairyBasicPointsPerLevel(fairyId, callbackWrapper(callback));
		});
		
		// 요정의 원소 속성에 대한 레벨 당 증가 포인트들을 반환합니다.
		let getFairyElementPointsPerLevel = self.getFairyElementPointsPerLevel = func((fairyId, callback) => {
			contract.getFairyElementPointsPerLevel(fairyId, callbackWrapper(callback));
		});
		
		// 최근에 태어난 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByBirthTime = self.getFairyIdsByBirthTime = func((callback) => {
			contract.getFairyIdsByBirthTime(callbackWrapper(callback));
		});
		
		// 소유주에 의해 추가된 레벨이 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAppendedLevel = self.getFairyIdsByAppendedLevel = func((callback) => {
			contract.getFairyIdsByAppendedLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 HP 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByHPPointPerLevel = self.getFairyIdsByHPPointPerLevel = func((callback) => {
			contract.getFairyIdsByHPPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 공격 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAttackPointPerLevel = self.getFairyIdsByAttackPointPerLevel = func((callback) => {
			contract.getFairyIdsByAttackPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 방어 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDefensePointPerLevel = self.getFairyIdsByDefensePointPerLevel = func((callback) => {
			contract.getFairyIdsByDefensePointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 민첩 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAgilityPointPerLevel = self.getFairyIdsByAgilityPointPerLevel = func((callback) => {
			contract.getFairyIdsByAgilityPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 재치 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDexterityPointPerLevel = self.getFairyIdsByDexterityPointPerLevel = func((callback) => {
			contract.getFairyIdsByDexterityPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 불 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByFirePointPerLevel = self.getFairyIdsByFirePointPerLevel = func((callback) => {
			contract.getFairyIdsByFirePointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 물 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByWaterPointPerLevel = self.getFairyIdsByWaterPointPerLevel = func((callback) => {
			contract.getFairyIdsByWaterPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 바람 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByWindPointPerLevel = self.getFairyIdsByWindPointPerLevel = func((callback) => {
			contract.getFairyIdsByWindPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 대지 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByEarthPointPerLevel = self.getFairyIdsByEarthPointPerLevel = func((callback) => {
			contract.getFairyIdsByEarthPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 빛 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByLightPointPerLevel = self.getFairyIdsByLightPointPerLevel = func((callback) => {
			contract.getFairyIdsByLightPointPerLevel(callbackWrapper(callback));
		});
		
		// 레벨 당 어둠 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDarkPointPerLevel = self.getFairyIdsByDarkPointPerLevel = func((callback) => {
			contract.getFairyIdsByDarkPointPerLevel(callbackWrapper(callback));
		});
		
		// 주어진 인터페이스가 구현되어 있는지 확인합니다.
		let supportsInterface = self.supportsInterface = func((interfaceID, callback) => {
			contract.supportsInterface(interfaceID, callbackWrapper(callback));
		});
	}
});
