EtherFairy.WalletManager = OBJECT({

	init : (inner, self) => {
		
		let isEnable;
		
		// 메타 마스크 체크
		if (typeof web3 !== 'undefined') {
			web3 = new Web3(web3.currentProvider);
			isEnable = true;
		}
		
		// 지갑을 사용할 수 있는지 확인
		let checkIsEnable = self.checkIsEnable = () => {
			return isEnable;
		};
		
		// 지갑이 잠금 상태인지 확인
		let checkIsLocked = self.checkIsLocked = () => {
			return web3.eth.accounts.length === 0
		};
		
		// 지갑 주소를 가져옵니다.
		let getWalletAddress = self.getWalletAddress = () => {
			if (checkIsEnable() === true && checkIsLocked() !== true) {
				return web3.eth.accounts[0];
			}
		};
	}
});
