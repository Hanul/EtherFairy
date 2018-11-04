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
			
			UUI.VALID_FORM({
				style : {
					marginTop : 30
				},
				errorMsgs : {
					username : {
						notEmpty : MSG('NULL_ID_ALERT'),
						size : (validParams) => {
							return MSG('ID_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						},
						username : MSG('ID_GUIDELINE_ALERT'),
						login : MSG('AUTHENTICATION_FAILED_ALERT')
					},
					password : {
						notEmpty : MSG('NULL_PW_ALERT'),
						size : (validParams) => {
							return MSG('PW_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
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
					placeholder : MSG('ID_NAMETAG')
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
					placeholder : MSG('PASSWORD_NAMETAG')
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
						value : MSG('SIGN_IN_AS_DESIGNER_BUTTON')
					}),
					
					Yogurt.Button({
						style : {
							flt : 'right',
							padding : 10,
							width : '46%'
						},
						title : MSG('SIGN_UP_AS_DESIGNER_BUTTON'),
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
