EtherFairy('Designer').Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(UUI.PANEL({
			style : {
				margin : 'auto',
				onDisplayResize : (width, height) => {
					if (width < 600) {
						return {
							width : '100%'
						};
					} else {
						return {
							width : 600
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
					color : '#FFEA4F'
				},
				c : MSG('START_DESIGNER_TITLE')
			}),
			
			DIV({
				style : {
					marginTop : 30
				},
				c : [
				P({
					c : MSG('START_DESIGNER_DESCRIPTION_1')
				}),
				P({
					style : {
						marginTop : 10
					},
					c : MSG('START_DESIGNER_DESCRIPTION_2')
				}),
				P({
					style : {
						marginTop : 10
					},
					c : MSG('START_DESIGNER_DESCRIPTION_3')
				}),
				P({
					style : {
						marginTop : 10
					},
					c : RUN(() => {
						let str = MSG('START_DESIGNER_DESCRIPTION_4');
						let email = 'contact@btncafe.com';
						let emailIndex = str.indexOf(email);
						return [str.substring(0, emailIndex), A({
							style : {
								color : '#C6B5F9'
							},
							href : 'mailto:' + email,
							c : email
						}), str.substring(emailIndex + email.length)]
					})
				}),
				P({
					style : {
						marginTop : 10
					},
					c : MSG('START_DESIGNER_DESCRIPTION_5')
				}),
				P({
					style : {
						marginTop : 10
					},
					c : MSG('START_DESIGNER_DESCRIPTION_6')
				}),
				
				Yogurt.Button({
					style : {
						marginTop : 30,
						padding : 10
					},
					title : MSG('SIGN_IN_AS_DESIGNER_BUTTON'),
					on : {
						tap : () => {
							EtherFairy.GO('designer/login');
						}
					}
				})]
			})]
		}));
	}
});
