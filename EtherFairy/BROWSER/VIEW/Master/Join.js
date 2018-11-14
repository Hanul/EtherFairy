EtherFairy('Master').Join = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		Contract2Object.getWalletAddress((walletAddress) => {
			
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
						color : '#FFEA4F',
						marginBottom : 20
					},
					c : MSG('SIGN_UP_AS_OWNER_TITLE')
				}),
				
				P({
					c : MSG('WALLET_ADDRESS') + ' : ' + walletAddress
				}),
				
				UUI.VALID_FORM({
					errorMsgs : {
						nickname : {
							notEmpty : MSG('NULL_NICKNAME_ALERT'),
							size : (validParams) => {
								return MSG('NICKNAME_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
							}
						},
						isAgreedTerms : {
							equal : MSG('TERMS_NO_AGREE_ALERT')
						},
						isAgreedPrivacy : {
							equal : MSG('PRIVACY_POLICY_NO_AGREE_ALERT')
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
						name : 'nickname',
						placeholder : MSG('NICKNAME_NAMETAG')
					}),
					
					DIV({
						style : {
							marginTop : 10
						},
						c : [Yogurt.Button({
							href : INFO.getLang() === 'ko' ? EtherFairy.R('terms-kr.html') : EtherFairy.R('terms.html'),
							target : '_blank',
							title : MSG('VIEW_TERMS_BUTTON')
						}), UUI.FULL_CHECKBOX({
							style : {
								marginTop : 10
							},
							name : 'isAgreedTerms',
							label : MSG('TERMS_AGREE_CHECKBOX')
						})]
					}),
					
					DIV({
						style : {
							marginTop : 10
						},
						c : [Yogurt.Button({
							href : INFO.getLang() === 'ko' ? 'https://btncafe.com/R/privacy-kr.html' : (INFO.getLang().substring(0, 2) === 'zh' ? 'https://btncafe.com/R/privacy-zh.html' : 'https://btncafe.com/R/privacy.html'),
							target : '_blank',
							title : MSG('VIEW_PRIVACY_POLICY_BUTTON')
						}), UUI.FULL_CHECKBOX({
							style : {
								marginTop : 10
							},
							name : 'isAgreedPrivacy',
							label : MSG('PRIVACY_POLICY_CHECKBOX')
						})]
					}),
					
					Yogurt.Submit({
						style : {
							marginTop : 10
						},
						value : MSG('SIGN_UP_AS_OWNER_BUTTON')
					})
					],
					on : {
						submit : (e, form) => {
							
							let data = form.getData();
							
							data.id = walletAddress;
							
							EtherFairy.MasterModel.create(data, {
								notValid : form.showErrors,
								success : () => {
									EtherFairy.REFRESH('master');
								}
							});
						}
					}
				})]
			}));
		});
	}
});
