EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				console.log(fairyOriginData);
				
				let masterMenu;
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
						c : [
						fairyOriginData.firePointPerLevel,
						fairyOriginData.waterPointPerLevel,
						fairyOriginData.windPointPerLevel,
						fairyOriginData.earthPointPerLevel,
						fairyOriginData.lightPointPerLevel,
						fairyOriginData.darkPointPerLevel
						]
					}),
					
					masterMenu = DIV()]
				}));
				
				// 소유주가 접속해 있으면 소유주 메뉴 추가
				EtherFairy.WalletManager.checkIsLocked((isLocked) => {
					
					if (isLocked !== true) {
						
						EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
							
							EtherFairy.MasterModel.get(walletAddress, {
								notExists : () => {
									// ignore.
								},
								success : () => {
									
									masterMenu.append(Yogurt.Button({
										c : MSG('BUY_FAIRY_BUTTON'),
										on : {
											tap : () => {
												
												// 이름 입력받기
												Yogurt.Prompt(MSG('PLEASE_ENTER_FAIRY_NAME'), (fairyName) => {
													
													let loadingPanel;
													
													masterMenu.append(loadingPanel = DIV({
														c : MSG('BUYING_FAIRY')
													}));
													
													// 요정 탄생시키기
													EtherFairy.EtherFairyContractController.birthFairy(
														fairyOriginData.id,
														'0x38b4343b3BE52374D83398159F2FA06ef78bDA7D',
														fairyName,
														fairyOriginData.firePointPerLevel,
														fairyOriginData.waterPointPerLevel,
														fairyOriginData.windPointPerLevel,
														fairyOriginData.earthPointPerLevel,
														fairyOriginData.lightPointPerLevel,
														fairyOriginData.darkPointPerLevel
													, {
														error : (errorMsg) => {
															alert(errorMsg);
															loadingPanel.remove();
														},
														success : () => {
															loadingPanel.remove();
															EtherFairy.GO('master/managefairy');
														}
													});
												});
											}
										}
									}));
								}
							});
						});
					}
				});
			});
		});
	}
});
