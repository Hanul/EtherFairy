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
				c : MSG('TRADE_FAIRY_TITLE')
			}),
			
			Yogurt.Button({
				title : MSG('TRADE_FAIRY_REGISTER_FAIRY_BUTTON'),
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
		
		Contract2Object.getWalletAddress((walletAddress) => {
			
			EtherFairy.MasterModel.get(walletAddress, {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					EtherFairy.FairyMarketContract.getSaleCount((saleCount) => {
						
						fairyList.empty();
						
						REPEAT(saleCount, (i) => {
							
							let fairyCardWrapper = DIV().appendTo(fairyList);
							
							EtherFairy.FairyMarketContract.getSaleInfo(i, (seller, fairyId, price) => {
								
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
					
					//EtherFairy.FairyMarketContract.findSaleIdByFairyId(0, console.log);
				}
			});
		});
	}
});
