EtherFairy('Designer').UpdateInfo = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('designer/start');
			},
			success : (signedDesignerData) => {
				
				let form;
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
						c : MSG('MODIFY_DESIGNER_INFO_TITLE')
					}),
					
					form = UUI.VALID_FORM({
						style : {
							marginTop : 20
						},
						errorMsgs : {
							username : {
								notEmpty : MSG('NULL_ID_ALERT'),
								size : (validParams) => {
									return MSG('ID_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
								},
								username : MSG('ID_GUIDELINE_ALERT'),
								existed : MSG('ID_ALREADY_USED_ALERT'),
								notAllowed : MSG('ID_NOT_POSSIBLE_ALERT')
							},
							password : {
								notEmpty : MSG('NULL_PW_ALERT'),
								size : (validParams) => {
									return MSG('PW_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
								}
							},
							email : {
								notEmpty : MSG('NULL_EMAIL_ALERT'),
								size : (validParams) => {
									return MSG('EMAIL_MIN_MAX_ALERT').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max);
								},
								email : MSG('CHECK_EMAIL_FORM_ALERT')
							},
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
							name : 'nickname',
							placeholder : MSG('NICKNAME_NAMETAG')
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
						
						Yogurt.Input({
							style : {
								marginTop : 10,
								padding : 10,
								border : 'none',
								borderRadius : 10
							},
							name : 'email',
							placeholder : MSG('RECOVERY_EMAIL_NAMETAG')
						}),
						
						Yogurt.Input({
							style : {
								marginTop : 10,
								padding : 10,
								border : 'none',
								borderRadius : 10
							},
							name : 'walletAddress',
							placeholder : MSG('DESIGNER_WALLET_ADDRESS')
						}),
						
						P({
							style : {
								marginTop : 10,
								fontSize : 14,
								color : '#ccc'
							},
							c : MSG('DESIGNER_WALLET_ADDRESS_INFO')
						}),
						
						Yogurt.Submit({
							style : {
								marginTop : 20
							},
							value : MSG('SAVE_DESIGNER_INFO_BUTTON')
						})
						],
						on : {
							submit : (e, form) => {
								
								let data = form.getData();
								
								data.id = signedDesignerData.id;
								
								EtherFairy.DesignerModel.update(data, {
									notValid : form.showErrors,
									success : () => {
										
										EtherFairy.DesignerModel.login(data, (userData) => {
											EtherFairy.GO('designer');
										});
									}
								});
							}
						}
					})]
				}));
				
				form.setData(signedDesignerData);
			}
		});
	}
});
