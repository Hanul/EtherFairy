EtherFairy.SmartContractRoom = OBJECT({

	init : (inner, self) => {
		
		let Web3 = require('web3');
		
		if (typeof global.web3 !== 'undefined') {
			global.web3 = new Web3(global.web3.currentProvider);
		} else {
			global.web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.isDevMode !== true ? 'https://mainnet.infura.io/v3/4e4b35a4604844b2b9e1fc6ef4905129' : 'https://ropsten.infura.io/v3/4e4b35a4604844b2b9e1fc6ef4905129'));
		}
		
		let contract = new web3.eth.Contract(EtherFairy.SmartContractABI, EtherFairy.SmartContractAddress);
		
		EtherFairy.ROOM('SmartContract', (clientInfo, on, off) => {
			
			on('test', (notUsing, ret) => {
				
				contract.methods.getFairyCount().call((error, fairyCount) => {
					
					// 계약 실행 오류 발생
					if (error !== TO_DELETE) {
						console.log(error.toString());
					}
					
					// 정상 작동
					else {
						
						REPEAT(fairyCount, (fairyId) => {
							
							contract.methods.getFairyBasicInfo(fairyId).call((error, result) => {
								
								// 계약 실행 오류 발생
								if (error !== TO_DELETE) {
									console.log(error.toString());
								}
								
								// 정상 작동
								else {
									console.log(result);
								}
							});
						});
					}
				});
			});
		});
	}
});
