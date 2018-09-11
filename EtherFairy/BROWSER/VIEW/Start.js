EtherFairy.Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let masterPannel;
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
							width : 950
						};
					}
				}
			},
			contentStyle : {
				padding : '50px 0'
			},
			c : [
			
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					marginBottom : 40,
					textAlign : 'center'
				},
				c : MSG('START_TITLE')
			}),
			
			// 소유주로 시작하기
			masterPannel = DIV({
				style : {
					flt : 'left',
					width : 458,
					height : 368,
					backgroundImage : EtherFairy.R('start/masterpanel.png'),
					cursor : 'pointer'
				},
				c : [H2({
					style : {
						marginTop : 15,
						textAlign : 'center',
						fontSize : 20,
						fontWeight : 'bold',
						color : '#633618'
					},
					c : MSG('START_MASTER')
				}), UUI.V_CENTER({
					style : {
						margin : 'auto',
						marginTop : 260,
						color : '#fef2d8',
						width : 300,
						height : 60,
						textAlign : 'center',
						lineHeight : '1.5em'
					},
					c : MSG('START_MASTER_DESCRIPTION')
				})],
				on : {
					tap : () => {
						
						// 메타마스크가 설치되어 있는 경우
						if (EtherFairy.WalletManager.checkIsEnable() === true) {
							
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
						
						// 메타마스크가 없는 경우 설치 경로 안내
						else {
							Yogurt.Confirm({
								msg : [IMG({
									src : EtherFairy.R('metamask.png')
								}), P({
									c : MSG('PLEASE_INSTALL_METAMASK')
								})],
								okButtonTitle : MSG('INSTALL_METAMASK_BUTTON'),
								target : '_blank',
								href : 'https://metamask.io'
							});
						}
					}
				}
			}),
			
			// 디자이너로 시작하기
			DIV({
				style : {
					flt : 'right',
					width : 458,
					height : 368,
					backgroundImage : EtherFairy.R('start/designerpanel.png'),
					cursor : 'pointer'
				},
				c : [H2({
					style : {
						marginTop : 15,
						textAlign : 'center',
						fontSize : 20,
						fontWeight : 'bold',
						color : '#633618'
					},
					c : MSG('START_DESIGNER')
				}), UUI.V_CENTER({
					style : {
						margin : 'auto',
						marginTop : 260,
						color : '#fef2d8',
						width : 300,
						height : 60,
						textAlign : 'center',
						lineHeight : '1.5em'
					},
					c : MSG('START_DESIGNER_DESCRIPTION')
				})],
				on : {
					tap : () => {
						EtherFairy.GO('designer/start');
					}
				}
			}),
			
			CLEAR_BOTH()]
		}));
	}
});
