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
				c : MSG('START_DESIGNER')
			}),
			
			UUI.VALID_FORM({
				style : {
					marginTop : 30
				},
				errorMsgs : {
					username : {
						notEmpty : MSG('NOT_VALID_USERNAME_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_USERNAME_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						},
						username : MSG('NOT_VALID_USERNAME_FORMAT'),
						login : MSG('OAUTH_ERROR')
					},
					password : {
						notEmpty : MSG('NOT_VALID_PASSWORD_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_PASSWORD_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						}
					}
				},
				errorMsgStyle : {
					marginTop : 5,
					color : 'red'
				},
				c : [
				Yogurt.Input({
					style : {
						marginTop : 10,
						padding : 10,
						border : 'none',
						borderRadius : 10
					},
					name : 'username',
					placeholder : MSG('USERNAME')
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10,
						padding : 10,
						border : 'none',
						borderRadius : 10
					},
					name : 'password',
					type : 'password',
					placeholder : MSG('PASSWORD')
				}),
				
				DIV({
					style : {
						marginTop : 30
					},
					c : [Yogurt.Submit({
						style : {
							flt : 'left',
							padding : 10,
							width : '46%'
						},
						value : MSG('LOGIN_DESIGNER')
					}),
					
					Yogurt.Button({
						style : {
							flt : 'right',
							padding : 10,
							width : '46%'
						},
						title : MSG('JOIN_DESIGNER'),
						on : {
							tap : () => {
								EtherFairy.GO('designer/join');
							}
						}
					}),
					
					CLEAR_BOTH()]
				})
				],
				on : {
					submit : (e, form) => {
						
						let data = form.getData();
						
						data.language = INFO.getLang();
						
						EtherFairy.DesignerModel.login(data, {
							notValid : form.showErrors,
							success : (userData) => {
								EtherFairy.REFRESH('');
							}
						});
					}
				}
			})]
		}));
	}
});
