EtherFairy.JoinDesigner = CLASS({
	
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
					textShadow : '0 0 20px #000000',
					marginBottom : 20
				},
				c : MSG('JOIN_DESIGNER')
			}),
			
			UUI.VALID_FORM({
				errorMsgs : {
					username : {
						notEmpty : MSG('NOT_VALID_USERNAME_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_USERNAME_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						},
						username : MSG('NOT_VALID_USERNAME_FORMAT'),
						existed : MSG('NOT_VALID_USERNAME_EXISTED'),
						notAllowed : MSG('NOT_VALID_USERNAME_NOT_ALLOWED')
					},
					password : {
						notEmpty : MSG('NOT_VALID_PASSWORD_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_PASSWORD_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						}
					},
					email : {
						notEmpty : MSG('NOT_VALID_EMAIL_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_EMAIL_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						},
						email : MSG('NOT_VALID_EMAIL_FORMAT')
					},
					nickname : {
						notEmpty : MSG('NOT_VALID_NICKNAME_NOT_EMPTY'),
						size : (validParams) => {
							return MSG('NOT_VALID_NICKNAME_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
						}
					},
					isAgreedTerms : {
						equal : MSG('NOT_VALID_AGREED_TERMS')
					},
					isAgreedPrivacy : {
						equal : MSG('NOT_VALID_AGREED_PRIVACY')
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
					name : 'nickname',
					placeholder : MSG('NICKNAME')
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10
					},
					name : 'password',
					type : 'password',
					placeholder : MSG('PASSWORD')
				}),
				
				Yogurt.Input({
					style : {
						marginTop : 10
					},
					name : 'email',
					placeholder : MSG('EMAIL_FOR_PASSWORD')
				}),
				
				DIV({
					style : {
						marginTop : 10
					},
					c : [Yogurt.Button({
						href : INFO.getLang() === 'ko' ? EtherFairy.R('terms-kr.html') : EtherFairy.R('terms.html'),
						target : '_blank',
						title : MSG('VIEW_TERMS')
					}), UUI.FULL_CHECKBOX({
						style : {
							marginTop : 10
						},
						name : 'isAgreedTerms',
						label : MSG('AGREE_TERMS')
					})]
				}),
				
				DIV({
					style : {
						marginTop : 10
					},
					c : [Yogurt.Button({
						href : INFO.getLang() === 'ko' ? 'https://btncafe.com/R/privacy-kr.html' : (INFO.getLang().substring(0, 2) === 'zh' ? 'https://btncafe.com/R/privacy-zh.html' : 'https://btncafe.com/R/privacy.html'),
						target : '_blank',
						title : MSG('VIEW_PRIVACY')
					}), UUI.FULL_CHECKBOX({
						style : {
							marginTop : 10
						},
						name : 'isAgreedPrivacy',
						label : MSG('AGREE_PRIVACY')
					})]
				}),
				
				Yogurt.Submit({
					style : {
						marginTop : 10
					},
					value : MSG('JOIN_DONE')
				})
				],
				on : {
					submit : (e, form) => {
						
						let data = form.getData();
						
						EtherFairy.DesignerModel.create(data, {
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
