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
		
		// 계약 생성
		let contract = web3.eth.contract(EtherFairy.SmartContractABI).at(EtherFairy.SmartContractAddress);
	}
});
