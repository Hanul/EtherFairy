EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				let ownerMenu;
				EtherFairy.Layout.setContent(DIV({
					style : {
						padding : 10
					},
					c : [
					
					H1({
						style : {
							fontSize : 30,
							fontWeight : 'bold',
							color : '#FFEA4F',
							marginBottom : 20
						},
						c : fairyOriginData.name
					}),
					
					IMG({
						style : {
							width : 250
						},
						src : EtherFairy.RF(fairyOriginData.imageFileId)
					}),
					
					P({
						c : 'test'
					}),
					
					ownerMenu = DIV()]
				}));
				
				// 소유주가 접속해 있으면 소유주 메뉴 추가
				if (EtherFairy.WalletManager.checkIsLocked() !== true) {
					EtherFairy.OwnerModel.get(EtherFairy.WalletManager.getWalletAddress(), {
						notExists : () => {
							// ignore.
						},
						success : () => {
							
							ownerMenu.append(Yogurt.Button({
								c : MSG('BUY_FAIRY_BUTTON'),
								on : {
									tap : () => {
										
										//TODO:
										
									}
								}
							}));
						}
					});
				}
			});
		});
	}
});
