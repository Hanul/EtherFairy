EtherFairy.WalletManager = OBJECT({

	init : (inner, self) => {
		
		let Web3 = require('web3');
		
		if (typeof global.web3 !== 'undefined') {
			global.web3 = new Web3(global.web3.currentProvider);
		} else {
			global.web3 = new Web3(new Web3.providers.WebsocketProvider(CONFIG.isDevMode !== true ? 'wss://mainnet.infura.io/ws' : 'wss://kovan.infura.io/ws'));
		}
	}
});
