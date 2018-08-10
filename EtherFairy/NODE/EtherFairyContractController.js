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
		
		// 요정의 개수를 반환합니다.
		let getFairyCount = self.getFairyCount = func((callback) => {
			contract.methods.getFairyCount().call(callbackWrapper(callback));
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
		
		// 최근에 태어난 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByBirthTime = self.getFairyIdsByBirthTime = func((callback) => {
			contract.methods.getFairyIdsByBirthTime().call(callbackWrapper(callback));
		});
		
		// 소유주에 의해 추가된 레벨이 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAppendedLevel = self.getFairyIdsByAppendedLevel = func((callback) => {
			contract.methods.getFairyIdsByAppendedLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 HP 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByHPPointPerLevel = self.getFairyIdsByHPPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByHPPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 공격 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAttackPointPerLevel = self.getFairyIdsByAttackPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByAttackPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 방어 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDefensePointPerLevel = self.getFairyIdsByDefensePointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByDefensePointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 민첩 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByAgilityPointPerLevel = self.getFairyIdsByAgilityPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByAgilityPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 재치 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDexterityPointPerLevel = self.getFairyIdsByDexterityPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByDexterityPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 불 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByFirePointPerLevel = self.getFairyIdsByFirePointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByFirePointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 물 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByWaterPointPerLevel = self.getFairyIdsByWaterPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByWaterPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 바람 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByWindPointPerLevel = self.getFairyIdsByWindPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByWindPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 대지 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByEarthPointPerLevel = self.getFairyIdsByEarthPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByEarthPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 빛 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByLightPointPerLevel = self.getFairyIdsByLightPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByLightPointPerLevel().call(callbackWrapper(callback));
		});
		
		// 레벨 당 어둠 속성 증가 포인트가 높은 순서대로 요정의 ID 목록을 가져옵니다.
		let getFairyIdsByDarkPointPerLevel = self.getFairyIdsByDarkPointPerLevel = func((callback) => {
			contract.methods.getFairyIdsByDarkPointPerLevel().call(callbackWrapper(callback));
		});
	}
});