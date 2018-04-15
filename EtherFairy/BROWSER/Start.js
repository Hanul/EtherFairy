EtherFairy.Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let content;
		EtherFairy.Layout.setContent(content = DIV({
			style : {
				padding : 10
			},
			c : [
			
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('START_TITLE')
			})
			
			]
		}));
		
		// 메타마스크가 설치되어 있는 경우
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			content.append(P({
				style : {
					marginTop : 20
				},
				c : MSG('START_DESCRIPTION')
			}));
			
			content.append(Yogurt.Button({
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
							
						}
					}
				}
			}));
		}
		
		// 메타마스크가 없는 경우 설치 경로 안내
		else {
			content.append(P({
				style : {
					marginTop : 20
				},
				c : MSG('PLEASE_INSTALL_METAMASK')
			}));
			
			content.append(Yogurt.Button({
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
