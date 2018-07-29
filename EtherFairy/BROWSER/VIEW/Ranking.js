EtherFairy.Ranking = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : 'test'
			}),
			
			fairyList = DIV()]
		}));
		
		let createFairyItem = (fairyOriginId, fairyName, birthTime, appendedLevel) => {
			
			console.log(fairyOriginId, fairyName, birthTime, appendedLevel);
		};
		
		// 계약 생성
		let contract = web3.eth.contract(EtherFairy.SmartContractABI).at(EtherFairy.SmartContractAddress);
		
		contract.getFairyCount((error, result) => {
			
			// 계약 실행 오류 발생
			if (error !== TO_DELETE) {
				alert(error.toString());
			}
			
			// 정상 작동
			else {
				let fairyCount = result.toNumber();
				
				REPEAT(fairyCount, (fairyId) => {
					
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
				});
			}
		});
	}
});
