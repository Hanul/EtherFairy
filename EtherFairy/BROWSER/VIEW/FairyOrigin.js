EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				let menu;
				let designedByPanel;
				EtherFairy.Layout.setContent(DIV({
					style : {
						onDisplayResize : (width, height) => {
							if (width < 886) {
								return {
									padding : 0
								};
							} else {
								return {
									padding : '50px 0'
								};
							}
						}
					},
					c : DIV({
						style : {
							position : 'relative',
							margin : 'auto',
							height : 674,
							backgroundImage : EtherFairy.R('fairyorigin/background.png'),
							backgroundPosition : 'center center',
							onDisplayResize : (width, height) => {
								if (width < 886) {
									return {
										width : '100%'
									};
								} else {
									return {
										width : 886
									};
								}
							}
						},
						c : [
						H1({
							style : {
								paddingTop : 12,
								fontSize : 22,
								fontWeight : 'bold',
								color : '#ffde5c',
								textShadow : EtherFairy.TextBorderShadow('#160b00'),
								textAlign : 'center'
							},
							c : MSG('FAIRY_ORIGINAL_TITLE')
						}),
						
						DIV({
							style : {
								margin : 'auto',
								onDisplayResize : (width, height) => {
									if (width < 886) {
										return {
											marginTop : 20
										};
									} else {
										return {
											marginTop : 40
										};
									}
								}
							},
							c : [EtherFairy.FairyOriginCard({
								style : {
									margin : 'auto',
									onDisplayResize : (width, height) => {
										if (width < 886) {
											return {
												flt : 'none',
												transform : 'scale(0.6)',
												transformOrigin : 'left top',
												width : 216,
												height : 330
											};
										} else {
											return {
												flt : 'left',
												transform : 'none',
												width : 360,
												height : 550
											};
										}
									}
								},
								contentStyle : {
									backgroundImage : EtherFairy.R('fairyorigin/card.png')
								},
								fairyOriginData : fairyOriginData,
								c : H4({
									style : {
										paddingTop : 10,
										textAlign : 'center',
										fontSize : 20,
										fontWeight : 'bold',
										color : '#9f8263',
										textShadow : EtherFairy.TextBorderShadow('#1d0e08')
									},
									c : MSG('FAIRY_ORIGINAL_PENDING_NAMETAG')
								})
							}),
							
							DIV({
								style : {
									onDisplayResize : (width, height) => {
										if (width < 886) {
											return {
												marginTop : 20,
												width : 'auto',
												flt : 'none',
												marginLeft : 0,
												textAlign : 'center'
											};
										} else {
											return {
												marginTop : 0,
												width : 360,
												flt : 'right',
												marginLeft : 20,
												textAlign : 'left'
											};
										}
									}
								},
								c : [H2({
									style : {
										fontSize : 20,
										fontWeight : 'bold',
										color : '#fff5ef',
										textShadow : EtherFairy.TextBorderShadow('#1d0e08')
									},
									c : fairyOriginData.name
								}), P({
									style : {
										marginTop : 10,
										fontSize : 16,
										fontWeight : 'bold',
										color : '#5c3115',
										onDisplayResize : (width, height) => {
											if (width < 886) {
												return {
													paddingBottom : 5
												};
											} else {
												return {
													paddingBottom : 20
												};
											}
										}
									},
									c : fairyOriginData.description
								}), menu = DIV({
									style : {
										onDisplayResize : (width, height) => {
											if (width < 886) {
												return {
													margin : 'auto',
													width : 216
												};
											} else {
												return {
													margin : 0,
													width : 'auto'
												};
											}
										}
									}
								}), designedByPanel = DIV({
									style : {
										width : 230,
										onDisplayResize : (width, height) => {
											if (width < 886) {
												return {
													margin : 'auto',
													position : 'relative',
													right : 0,
													bottom : 0,
													transform : 'scale(0.7)'
												};
											} else {
												return {
													margin : 0,
													position : 'absolute',
													right : 50,
													bottom : 20,
													transform : 'none'
												};
											}
										}
									}
								})]
							}),
							
							CLEAR_BOTH()]
						})]
					})
				}));
				
				EtherFairy.DesignerModel.get(fairyOriginData.designerId, (designerData) => {
					
					designedByPanel.append(DIV({
						style : {
							flt : 'left',
							fontSize : 20,
							fontWeight : 'bold',
							color : '#a2834b',
							paddingTop : 30,
							marginRight : 10
						},
						c : 'Designed by'
					}));
					
					designedByPanel.append(DIV({
						style : {
							position : 'relative',
							flt : 'left',
							width : 111,
							height : 93,
							backgroundImage : EtherFairy.R('fairyorigin/seal.png')
						},
						c : SPAN({
							style : {
								position : 'absolute',
								width : 100,
								textAlign : 'center',
								left : 8,
								top : 30,
								fontSize : 20,
								fontWeight : 'bold',
								color : '#ffe7bd',
								textShadow : EtherFairy.TextBorderShadow('#200803')
							},
							c : designerData.nickname
						})
					}));
					
					designedByPanel.append(CLEAR_BOTH());
				});
				
				if (fairyOriginData.isInReview === true) {
					
					// 심사중인 요정
					menu.append(P({
						style : {
							marginTop : 10,
							fontStyle : 'italic',
							fontSize : 20,
							fontWeight : 'bold',
							color : '#a2834b'
						},
						c : MSG('WAIT_EXAMINE_FAIRY')
					}));
				}
				
				// 메타마스크가 설치되어 있는 경우
				if (Contract2Object.checkWalletEnable() === true) {
					
					if (fairyOriginData.isPublished === true) {
						
						// 소유주가 접속해 있으면 소유주 메뉴 추가
						Contract2Object.checkWalletLocked((isLocked) => {
							
							if (isLocked !== true) {
								
								Contract2Object.getWalletAddress((walletAddress) => {
									
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
														Yogurt.Prompt(MSG('BUY_FAIRY_BUY_DIALOGBOX_TITLE'), (fairyName) => {
															
															let loadingPanel;
															
															menu.append(loadingPanel = DIV({
																style : {
																	padding : '20px 0'
																},
																c : MSG('BUY_FAIRY_BUY_NOW_BUYING_DESCRIPTION')
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
					}
					
					else {
						
						if (fairyOriginData.isInReview === true) {
							
							// 내가 디자인한 요정인 경우
							EtherFairy.DesignerModel.checkSigned((signedDesignerData) => {
								
								if (fairyOriginData.designerId === signedDesignerData.id) {
									
									// 심사 취소 버튼
									menu.append(Yogurt.Button({
										style : {
											marginTop : 10
										},
										c : MSG('CANCEL_EXAMINE_FAIRY_BUTTON'),
										on : {
											tap : () => {
												
												let loading = EtherFairy.Loading();
												
												EtherFairy.FairyOriginModel.update({
													id : fairyOriginData.id,
													isInReview : false
												}, () => {
													loading.remove();
													REFRESH();
												});
											}
										}
									}));
								}
							});
							
							// 관리자인 경우
							EtherFairy.AdminController.check(() => {
								
								// 심사 통과 버튼
								menu.append(Yogurt.Button({
									style : {
										marginTop : 10
									},
									c : '심사 통과',
									on : {
										tap : () => {
											
											//TODO: 로딩 필요
											
											EtherFairy.FairyOriginModel.update({
												id : fairyOriginData.id,
												isInReview : false,
												isPublished : true
											}, () => {
												REFRESH();
											});
										}
									}
								}));
							});
							
						} else {
							
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
												
												if (VALID.notEmpty(signedDesignerData.walletAddress) === true) {
													
													Yogurt.Confirm({
														msg : MSG('REGIST_EXAMINE_FAIRY_ALERT')
													}, () => {
														
														let loading = EtherFairy.Loading();
														
														EtherFairy.FairyOriginModel.update({
															id : fairyOriginData.id,
															isInReview : true
														}, () => {
															loading.remove();
															REFRESH();
														});
													});
												}
												
												else {
													
													Yogurt.Confirm({
														msg : MSG('NOT_EXISTS_DESIGNER_WALLET_ADDRESS'),
														okButtonTitle : MSG('UPDATE_DESIGNER_INFO_BUTTON')
													}, () => {
														EtherFairy.GO('designer/updateinfo');
													});
												}
											}
										}
									}));
								}
							});
						}
					}
				}
				
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
