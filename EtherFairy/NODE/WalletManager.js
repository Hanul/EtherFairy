EtherFairy.WalletManager = OBJECT({

	init : (inner, self) => {
		
		let Web3 = require('web3');
		
		if (typeof global.web3 !== 'undefined') {
			global.web3 = new Web3(global.web3.currentProvider);
		} else {
			global.web3 = new Web3(new Web3.providers.HttpProvider(CONFIG.isDevMode !== true ? 'https://mainnet.infura.io/v3/4e4b35a4604844b2b9e1fc6ef4905129' : 'https://ropsten.infura.io/v3/4e4b35a4604844b2b9e1fc6ef4905129'));
		}
		
		// 계약 생성
		EtherFairy.EtherFairyContractController.setContract(new web3.eth.Contract(EtherFairy.EtherFairyContractABI, EtherFairy.EtherFairyContractAddress));
	}
});
