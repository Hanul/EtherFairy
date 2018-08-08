EtherFairy('Designer').Start = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
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
				c : MSG('START_DESIGNER')
			}),
			
			UUI.VALID_FORM({
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
						marginTop : 10
					},
					name : 'username',
					placeholder : MSG('USERNAME')
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10
					},
					name : 'password',
					type : 'password',
					placeholder : MSG('PASSWORD')
				}),
				
				Yogurt.Submit({
					style : {
						marginTop : 10
					},
					value : MSG('LOGIN_DESIGNER')
				}),
				
				Yogurt.Button({
					style : {
						marginTop : 10
					},
					title : MSG('JOIN_DESIGNER'),
					on : {
						tap : () => {
							EtherFairy.GO('designer/join');
						}
					}
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
