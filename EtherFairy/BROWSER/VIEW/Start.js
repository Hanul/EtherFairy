EtherFairy.Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let masterPannel;
		let masterDescription;
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
				c : MSG('START_TITLE')
			}),
			
			// 소유주로 시작하기
			masterPannel = DIV({
				style : {
					flt : 'left',
					width : '49%',
					height : 300,
					backgroundImage : EtherFairy.R('pattern/footer_lodyas.png')
				},
				c : [masterDescription = DIV({
					style : {
						height : 300
					},
					c : [H2({
						style : {
							textAlign : 'center',
							fontSize : 20,
							fontWeight : 'bold',
							color : '#FFEA4F'
						},
						c : MSG('START_MASTER')
					}), P({
						style : {
							textAlign : 'center'
						},
						c : MSG('START_MASTER_DESCRIPTION')
					})]
				})]
			}),
			
			// 디자이너로 시작하기
			DIV({
				style : {
					flt : 'right',
					width : '49%',
					backgroundImage : EtherFairy.R('pattern/footer_lodyas.png')
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
							color : '#FFEA4F'
						},
						c : MSG('START_DESIGNER')
					}), P({
						style : {
							textAlign : 'center'
						},
						c : MSG('START_DESIGNER_DESCRIPTION')
					})]
				}), Yogurt.Button({
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
				})]
			}),
			
			CLEAR_BOTH()]
		}));
		
		// 메타마스크가 설치되어 있는 경우
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			masterDescription.append(P({
				style : {
					marginTop : 20
				},
				c : MSG('START_DESCRIPTION')
			}));
			
			masterPannel.append(Yogurt.Button({
				style : {
					marginTop : 20,
					border : 'none'
				},
				title : MSG('START_BUTTON'),
				on : {
					tap : () => {
						
						if (EtherFairy.WalletManager.checkIsLocked() === true) {
							Yogurt.Alert({
								msg : MSG('PLEASE_UNLOCK_METAMASK')
							});
						}
						
						else {
							
							EtherFairy.MasterModel.checkExists(EtherFairy.WalletManager.getWalletAddress(), (exists) => {
								
								if (exists === true) {
									EtherFairy.REFRESH('master');
								}
								
								// 존재하지 않으면, 생성
								else {
									EtherFairy.GO('master/join');
									/*
									Yogurt.Prompt(MSG('PLEASE_ENTER_MASTER_NICKNAME'), (value) => {
										
										EtherFairy.MasterModel.create({
											id : EtherFairy.WalletManager.getWalletAddress(),
											nickname : value
										}, () => {
											EtherFairy.GO('master');
										});
									});
									*/
								}
							});
						}
					}
				}
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
			
			masterPannel.append(Yogurt.Button({
				style : {
					marginTop : 20,
					border : 'none'
				},
				href : 'https://metamask.io',
				target : '_blank',
				title : MSG('INSTALL_METAMASK_BUTTON')
			}));
		}
	}
});
