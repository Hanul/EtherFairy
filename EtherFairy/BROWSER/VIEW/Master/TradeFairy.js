EtherFairy('Master').TradeFairy = CLASS({
	
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
			
			A({
				c : MSG('START_TRADE_FAIRY'),
				on : {
					tap : () => {
						EtherFairy.GO('master/starttradefairy');
					}
				}
			}),
			
			P({
				c : 'test'
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
					
					EtherFairy.FairyMarketContractController.getSaleCount((saleCount) => {
						
						fairyList.empty();
						
						REPEAT(saleCount, (i) => {
							
							let fairyCardWrapper = DIV().appendTo(fairyList);
							
							EtherFairy.FairyMarketContractController.getSaleInfo(i, (saleInfo) => {
								
								let seller = saleInfo[0];
								let fairyId = saleInfo[1];
								let price = saleInfo[2];
								
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
											EtherFairy.GO('fairy/' + fairyId);
										}
									}
								}));
							});
						});
						
						fairyList.append(CLEAR_BOTH());
					});
					
					//EtherFairy.FairyMarketContractController.findSaleIdByFairyId(0, console.log);
				}
			});
		});
	}
});
