EtherFairy('Company').CreateDesignerIdentity = CLASS({
	
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
				c : '디자이너 Identity 추가'
			}),
			
			UUI.VALID_FORM({
				style : {
					marginTop : 30
				},
				errorMsgs : {
					adminPassword : {
					},
					name : {
						notEmpty : MSG('NULL_PW_ALERT')
					},
					email : {
						notEmpty : MSG('NULL_EMAIL_ALERT'),
						size : (validParams) => {
							return MSG('EMAIL_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						},
						email : MSG('CHECK_EMAIL_FORM_ALERT')
					},
					phoneNumber : {
						notEmpty : MSG('NULL_NICKNAME_ALERT')
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
					name : 'adminPassword',
					placeholder : '관리자 비밀번호'
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10,
						padding : 10,
						border : 'none',
						borderRadius : 10
					},
					name : 'name',
					placeholder : '실명'
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10,
						padding : 10,
						border : 'none',
						borderRadius : 10
					},
					name : 'email',
					placeholder : '이메일'
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10,
						padding : 10,
						border : 'none',
						borderRadius : 10
					},
					name : 'phoneNumber',
					placeholder : '전화번호'
				}),
				
				Yogurt.Submit({
					style : {
						marginTop : 30
					},
					value : '작성완료'
				})
				],
				on : {
					submit : (e, form) => {
						
						let data = form.getData();
						
						EtherFairy.DesignerIdentityModel.create(data, {
							notValid : form.showErrors,
							success : () => {
								
								EtherFairy.DesignerModel.login(data, (userData) => {
									EtherFairy.REFRESH('');
								});
							}
						});
					}
				}
			})]
		}));
	}
});
