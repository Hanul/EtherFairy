EtherFairy.FairyMarketContractController = OBJECT({

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
		
		// 회사의 지갑 주소를 반환합니다.
		let getCompanyAddress = self.getCompanyAddress = func((callback) => {
			contract.company(callbackWrapper(callback));
		});
		
		// 소유권을 이전합니다.
		let transferOwnership = self.transferOwnership = func((newCompany, callback) => {
			contract.transferOwnership(newCompany, transactionCallbackWrapper(callback));
		});
		
		// 마켓의 작동을 중지합니다.
		let pauseMarket = self.pauseMarket = func((callback) => {
			contract.pauseMarket(transactionCallbackWrapper(callback));
		});
		
		// 마켓을 재개합니다.
		let resumeMarket = self.resumeMarket = func((callback) => {
			contract.resumeMarket(transactionCallbackWrapper(callback));
		});
		
		// 요정 판매 개수를 가져옵니다.
		let getSaleCount = self.getSaleCount = func((callback) => {
			contract.getSaleCount(callbackWrapper(callback));
		});
		
		// 요정 판매 정보를 가져옵니다.
		let getSaleInfo = self.getSaleInfo = func((saleId, callback) => {
			contract.sales(saleId, callbackWrapper(callback));
		});
		
		// 요정 판매를 시작합니다.
		let startSale = self.startSale = func((fairyId, price, callback) => {
			contract.startSale(fairyId, web3.toWei(price, 'ether'), transactionCallbackWrapper(callback));
		});
		
		// 요정이 판매되고 있는지 확인합니다.
		let checkFairyForSale = self.checkFairyForSale = func((fairyId, callback) => {
			contract.checkFairyForSale(fairyId, callbackWrapper(callback));
		});
		
		// 요정 ID로 판매 정보 ID를 가져옵니다.
		let findSaleIdByFairyId = self.findSaleIdByFairyId = func((fairyId, callback) => {
			contract.findSaleIdByFairyId(fairyId, callbackWrapper(callback));
		});
		
		// 요정 판매를 취소합니다.
		let cancelSale = self.cancelSale = func((fairyId, callback) => {
			contract.cancelSale(fairyId, transactionCallbackWrapper(callback));
		});
		
		// 요정을 구매합니다.
		let buy = self.buy = func((fairyId, price, callback) => {
			contract.buy(fairyId, {
				value : price
			}, transactionCallbackWrapper(callback));
		});
	}
});
