EtherFairy('Master').StartTradeFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				margin : 'auto',
				width : 1110,
				padding : '30px 0 50px 10px'
			},
			c : [
			P({
				c : MSG('SELECT_TO_TRADE_FAIRY')
			}),
			
			fairyList = DIV({
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.png')
				})
			})]
		}));
		
		Contract2Object.getWalletAddress((walletAddress) => {
			
			EtherFairy.MasterModel.get(walletAddress, {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					EtherFairy.EtherFairyContract.balanceOf(walletAddress, (fairyCount) => {
						
						fairyList.empty();
						
						REPEAT(fairyCount, (i) => {
								
							let fairyCardWrapper = DIV().appendTo(fairyList);
							
							EtherFairy.EtherFairyContract.getFairyId({
								walletAddress : walletAddress,
								i : i
							}, (fairyId) => {
								
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
												
												EtherFairy.FairyMarketContract.startSale({
													fairyId : fairyId,
													ether : REAL(price)
												}, () => {
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
