EtherFairy.Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let masterPannel;
		let masterDescription;
		EtherFairy.Layout.setContent(UUI.PANEL({
			style : {
				margin : 'auto',
				onDisplayResize : (width, height) => {
					if (width < 1024) {
						return {
							width : '100%'
						};
					} else {
						return {
							width : 1024
						};
					}
				}
			},
			contentStyle : {
				padding : '50px 10px'
			},
			c : [
			
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					marginBottom : 20
				},
				c : MSG('START_TITLE')
			}),
			
			// 소유주로 시작하기
			masterPannel = DIV({
				style : {
					border : '1px solid #999',
					flt : 'left',
					width : '49%',
					borderRadius : '20px 20px 0 0'
				},
				c : [DIV({
					style : {
						height : 300
					},
					c : [H2({
						style : {
							textAlign : 'center',
							fontSize : 20,
							fontWeight : 'bold',
							color : '#FFEA4F',
							padding : '20px 0',
							borderBottom : '1px solid #999'
						},
						c : MSG('START_MASTER')
					}), masterDescription = P({
						style : {
							textAlign : 'center',
							padding : 10
						},
						c : P({
							c : MSG('START_MASTER_DESCRIPTION')
						})
					}), DIV({
						style : {
							marginTop : 35,
							textAlign : 'center'
						},
						c : IMG({
							src : EtherFairy.R('start/master.png')
						})
					})]
				})]
			}),
			
			// 디자이너로 시작하기
			DIV({
				style : {
					border : '1px solid #999',
					flt : 'right',
					width : '49%',
					borderRadius : '20px 20px 0 0'
				},
				c : [DIV({
					style : {
						height : 300
					},
					c : [H2({
						style : {
							textAlign : 'center',
							fontSize : 20,
							fontWeight : 'bold',
							color : '#FFEA4F',
							padding : '20px 0',
							borderBottom : '1px solid #999'
						},
						c : MSG('START_DESIGNER')
					}), P({
						style : {
							textAlign : 'center',
							padding : 10
						},
						c : MSG('START_DESIGNER_DESCRIPTION')
					}), DIV({
						style : {
							marginTop : 35,
							textAlign : 'center'
						},
						c : IMG({
							src : EtherFairy.R('start/designer.png')
						})
					})]
				}), DIV({
					style : {
						padding : 20
					},
					c : Yogurt.Button({
						style : {
							marginTop : 20,
							border : 'none'
						},
						title : MSG('START_BUTTON'),
						on : {
							tap : () => {
								EtherFairy.GO('designer/start');
							}
						}
					})
				})]
			}),
			
			CLEAR_BOTH()]
		}));
		
		// 메타마스크가 설치되어 있는 경우
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			masterPannel.append(DIV({
				style : {
					padding : 20
				},
				c : Yogurt.Button({
					style : {
						marginTop : 20,
						border : 'none'
					},
					title : MSG('START_BUTTON'),
					on : {
						tap : () => {
							
							EtherFairy.WalletManager.checkIsLocked((isLocked) => {
								
								if (isLocked === true) {
									Yogurt.Alert({
										msg : [IMG({
											src : EtherFairy.R('metamask.png')
										}), P({
											c : MSG('PLEASE_UNLOCK_METAMASK')
										})]
									});
								}
								
								else {
									
									EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
										
										EtherFairy.MasterModel.checkExists({
											filter : {
												id : walletAddress
											}
										}, (exists) => {
											
											if (exists === true) {
												EtherFairy.REFRESH('master');
											}
											
											// 존재하지 않으면, 생성
											else {
												EtherFairy.GO('master/join');
											}
										});
									});
								}
							});
						}
					}
				})
			}));
		}
		
		// 메타마스크가 없는 경우 설치 경로 안내
		else {
			masterDescription.append(P({
				style : {
					marginTop : 20
				},
				c : MSG('PLEASE_INSTALL_METAMASK')
			}));
			
			masterPannel.append(DIV({
				style : {
					padding : 20
				},
				c : Yogurt.Button({
					style : {
						marginTop : 20,
						border : 'none'
					},
					href : 'https://metamask.io',
					target : '_blank',
					title : MSG('INSTALL_METAMASK_BUTTON')
				})
			}));
		}
	}
});
