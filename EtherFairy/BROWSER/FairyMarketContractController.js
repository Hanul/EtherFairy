EtherFairy.FairyMarketContractController = OBJECT({

	init : (inner, self) => {
		
		let contract;
		let setContract = self.setContract = (_contract) => {
			contract = _contract;
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
				else {
					
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
		
		// 소유권을 이전합니다.
		let transferOwnership = self.transferOwnership = func((newCompany, callback) => {
			contract.transferOwnership(newCompany, callbackWrapper(callback));
		});
		
		// 마켓의 작동을 중지합니다.
		let pauseMarket = self.pauseMarket = func((callback) => {
			contract.pauseMarket(callbackWrapper(callback));
		});
		
		// 마켓을 재개합니다.
		let resumeMarket = self.resumeMarket = func((callback) => {
			contract.resumeMarket(callbackWrapper(callback));
		});
		
		// 요정 판매를 시작합니다.
		let startSale = self.startSale = func((fairyId, price, callback) => {
			contract.startSale(fairyId, price, callbackWrapper(callback));
		});
		
		// 요정 판매를 취소합니다.
		let cancelSale = self.cancelSale = func((fairyId, callback) => {
			contract.cancelSale(fairyId, callbackWrapper(callback));
		});
		
		// 요정을 구매합니다.
		let buy = self.buy = func((fairyId, callback) => {
			contract.buy(fairyId, callbackWrapper(callback));
		});
	}
});
