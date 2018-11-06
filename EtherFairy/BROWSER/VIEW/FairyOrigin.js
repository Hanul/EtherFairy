EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				let masterMenu;
				EtherFairy.Layout.setContent(DIV({
					style : {
						width : 800,
						margin : 'auto',
						padding : '30px 0'
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
					
					EtherFairy.FairyOriginCard({
						style : {
							flt : 'left'
						},
						fairyOriginData : fairyOriginData
					}),
					
					masterMenu = DIV({
						style : {
							width : 420,
							marginLeft : 20,
							flt : 'left'
						}
					}),
					
					CLEAR_BOTH()]
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
														style : {
															padding : '20px 0'
														},
														c : MSG('BUYING_FAIRY')
													}));
													
													// 요정 탄생시키기
													EtherFairy.EtherFairyContract.birthFairy({
														fairyOriginId : fairyOriginData.id,
														designer : '0x38b4343b3BE52374D83398159F2FA06ef78bDA7D',
														name : fairyName,
														firePointPerLevel : fairyOriginData.firePointPerLevel,
														waterPointPerLevel : fairyOriginData.waterPointPerLevel,
														windPointPerLevel : fairyOriginData.windPointPerLevel,
														earthPointPerLevel : fairyOriginData.earthPointPerLevel,
														lightPointPerLevel : fairyOriginData.lightPointPerLevel,
														darkPointPerLevel : fairyOriginData.darkPointPerLevel,
														ether : 0.05
													}, {
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
				
				EtherFairy.EtherFairyContract.getFairyCountByOriginId(fairyOriginId, (fairyCount) => {
					console.log(fairyCount);
				});
				
				EtherFairy.EtherFairyContract.getFairyIdsByOriginId(fairyOriginId, (fairyIds) => {
					console.log(fairyIds);
				});
			});
		});
	}
});
