EtherFairy('Owner').ManageFairy = CLASS({
	
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
		
		if (EtherFairy.WalletManager.checkIsLocked() !== true) {
			
			EtherFairy.OwnerModel.get(EtherFairy.WalletManager.getWalletAddress(), {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					// 계약 생성
					let contract = web3.eth.contract(EtherFairy.SmartContractABI).at(EtherFairy.SmartContractAddress);
					
					contract.getFairyCount(EtherFairy.WalletManager.getWalletAddress(), (error, result) => {
						
						// 계약 실행 오류 발생
						if (error !== TO_DELETE) {
							alert(error.toString());
						}
						
						// 정상 작동
						else {
							REPEAT(result.toNumber(), (fairyIndex) => {
								
								contract.getFairyBasicInfo(EtherFairy.WalletManager.getWalletAddress(), fairyIndex, (error, result) => {
									
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
										
										EACH(result, (value) => {
											console.log(value);
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
