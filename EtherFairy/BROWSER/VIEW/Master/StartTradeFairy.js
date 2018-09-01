EtherFairy('Master').StartTradeFairy = CLASS({
	
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
				c : MSG('SELECT_TO_TRADE_FAIRY')
			}),
			
			fairyList = DIV({
				style : {
					margin : 'auto',
					width : 930,
					paddingLeft : 10
				},
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.svg')
				})
			})]
		}));
		
		EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
			
			EtherFairy.MasterModel.get(walletAddress, {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					EtherFairy.EtherFairyContractController.balanceOf(walletAddress, (fairyCount) => {
						
						fairyList.empty();
						
						REPEAT(fairyCount, (i) => {
								
							let fairyCardWrapper = DIV().appendTo(fairyList);
							
							EtherFairy.EtherFairyContractController.getFairyId(walletAddress, i, (fairyId) => {
								
								fairyCardWrapper.append(EtherFairy.FairyCard({
									style : {
										marginTop : 10,
										marginRight : 10,
										flt : 'left',
										cursor : 'pointer'
									},
									fairyId : fairyId,
									on : {
										tap : () => {
											
											// 가격 입력
											Yogurt.Prompt(MSG('ENTER_FAIRY_PRICE') + ' (Ether)', (price) => {
												
												EtherFairy.FairyMarketContractController.startSale(fairyId, REAL(price), () => {
													EtherFairy.GO('master/tradefairy');
												});
											});
										}
									}
								}));
							});
						});
						
						fairyList.append(CLEAR_BOTH());
					});
				}
			});
		});
	}
});
