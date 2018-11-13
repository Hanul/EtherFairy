EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				let menu;
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
					
					DIV({
						style : {
							width : 420,
							marginLeft : 20,
							flt : 'left'
						},
						c : [P({
							c : fairyOriginData.description
						}), menu = DIV()]
					}),
					
					CLEAR_BOTH()]
				}));
				
				// 내가 디자인한 요정인 경우
				EtherFairy.DesignerModel.checkSigned((signedDesignerData) => {
					
					if (fairyOriginData.designerId === signedDesignerData.id) {
						
						// 수정 버튼
						menu.append(Yogurt.Button({
							style : {
								marginTop : 10
							},
							c : MSG('MODIFY_FAIRY_BUTTON'),
							on : {
								tap : () => {
									EtherFairy.GO('designer/designfairy/' + fairyOriginData.id);
								}
							}
						}));
						
						// 심사 등록 버튼
						menu.append(Yogurt.Button({
							style : {
								marginTop : 10
							},
							c : MSG('REGIST_EXAMINE_FAIRY_BUTTON'),
							on : {
								tap : () => {
									alert('준비중입니다.');
								}
							}
						}));
					}
				});
				
				// 소유주가 접속해 있으면 소유주 메뉴 추가
				EtherFairy.WalletManager.checkIsLocked((isLocked) => {
					
					if (isLocked !== true) {
						
						EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
							
							EtherFairy.MasterModel.get(walletAddress, {
								notExists : () => {
									// ignore.
								},
								success : () => {
									
									menu.append(Yogurt.Button({
										style : {
											marginTop : 10
										},
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
													
													EtherFairy.DesignerModel.get(fairyOriginData.designerId, (designerData) => {
														
														// 요정 탄생시키기
														EtherFairy.EtherFairyContract.birthFairy({
															fairyOriginId : fairyOriginData.id,
															designer : designerData.walletAddress,
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
