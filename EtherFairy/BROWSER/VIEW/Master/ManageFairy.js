EtherFairy('Master').ManageFairy = CLASS({
	
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
					src : EtherFairy.R('loading.gif')
				})
			})]
		}));
		
		if (EtherFairy.WalletManager.checkIsLocked() !== true) {
			
			EtherFairy.MasterModel.get(EtherFairy.WalletManager.getWalletAddress(), {
				notExists : () => {
					//TODO:
				},
				success : () => {
					
					EtherFairy.EtherFairyContractController.balanceOf(EtherFairy.WalletManager.getWalletAddress(), (fairyCount) => {
						
						fairyList.empty();
						
						REPEAT(fairyCount, (i) => {
							
							let fairyCardWrapper = DIV().appendTo(fairyList);
							
							EtherFairy.EtherFairyContractController.getFairyId(EtherFairy.WalletManager.getWalletAddress(), i, (fairyId) => {
								
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
				}
			});
		}
	}
});
