EtherFairy.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let tokenInfoPanel;
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : '메인 화면 테스트'
			}),
			
			tokenInfoPanel = DIV()]
		}));
		
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			// 토큰 정보 표시
			EtherFairy.EtherFairyContractController.name((name) => {
				tokenInfoPanel.append(P({
					c : MSG('TOKEN_NAME') + ' : ' + name
				}));
				
				EtherFairy.EtherFairyContractController.symbol((symbol) => {
					tokenInfoPanel.append(P({
						c : MSG('TOKEN_SYMBOL') + ' : ' + symbol
					}));
				});
			});
		}
	}
});
