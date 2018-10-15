EtherFairy('Master').TradeFairy = CLASS({
	
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
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					marginBottom : 20
				},
				c : MSG('TRADE_TITLE')
			}),
			
			Yogurt.Button({
				title : MSG('START_TRADE_FAIRY'),
				on : {
					tap : () => {
						EtherFairy.GO('master/starttradefairy');
					}
				}
			}),
			
			fairyList = DIV({
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
