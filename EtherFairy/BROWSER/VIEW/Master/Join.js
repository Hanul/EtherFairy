EtherFairy('Master').Join = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
			
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
					c : MSG('JOIN_MASTER')
				}),
				
				P({
					c : MSG('WALLET_ADDRESS') + ' : ' + walletAddress
				}),
				
				UUI.VALID_FORM({
					errorMsgs : {
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
						name : 'nickname',
						placeholder : MSG('NICKNAME')
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
