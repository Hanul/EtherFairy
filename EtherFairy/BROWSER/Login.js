EtherFairy.Login = CLASS({
	
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
				c : MSG('LOGIN_TITLE')
			})
			
			]
		}));
		
		// 메타마스크가 설치되어 있는 경우
		if (typeof web3 !== 'undefined') {
			content.append(P({
				style : {
					marginTop : 20
				},
				c : MSG('LOGIN_DESCRIPTION')
			}));
			
			content.append(Yogurt.Button({
				style : {
					marginTop : 20,
					border : 'none'
				},
				title : MSG('LOGIN_BUTTON')
			}));
		}
		
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
