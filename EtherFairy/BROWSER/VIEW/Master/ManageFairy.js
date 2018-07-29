EtherFairy('Master').ManageFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : 'test'
			})]
		}));
		
		let createFairyItem = (fairyOriginId, fairyName, birthTime, appendedLevel) => {
			
			console.log(fairyOriginId, fairyName, birthTime, appendedLevel);
		};
		
		if (EtherFairy.WalletManager.checkIsLocked() !== true) {
			
			EtherFairy.MasterModel.get(EtherFairy.WalletManager.getWalletAddress(), {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					// 계약 생성
					let contract = web3.eth.contract(EtherFairy.SmartContractABI).at(EtherFairy.SmartContractAddress);
					
					contract.balanceOf(EtherFairy.WalletManager.getWalletAddress(), (error, result) => {
						
						// 계약 실행 오류 발생
						if (error !== TO_DELETE) {
							alert(error.toString());
						}
						
						// 정상 작동
						else {
							
							let fairyCount = result.toNumber();
							
							REPEAT(fairyCount, (i) => {
								
								contract.masterToFairyIds(EtherFairy.WalletManager.getWalletAddress(), i, (error, result) => {
									
									// 계약 실행 오류 발생
									if (error !== TO_DELETE) {
										alert(error.toString());
									}
									
									// 정상 작동
									else {
										
										let fairyId = result.toNumber();
										
										contract.getFairyBasicInfo(fairyId, (error, result) => {
											
											// 계약 실행 오류 발생
											if (error !== TO_DELETE) {
												alert(error.toString());
											}
											
											// 정상 작동
											else {
												
												EACH(result, (value, i) => {
													if (value.toNumber !== undefined) {
														result[i] = value.toNumber();
													}
												});
												
												createFairyItem.apply(undefined, result);
											}
										});
									}
								});
							});
						}	
					});
				}
			});
		}
	}
});
