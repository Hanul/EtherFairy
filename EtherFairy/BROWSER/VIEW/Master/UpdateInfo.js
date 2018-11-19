EtherFairy('Master').UpdateInfo = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		Contract2Object.getWalletAddress((walletAddress) => {
			
			EtherFairy.MasterModel.get(walletAddress, (masterData) => {
				
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
							color : '#FFEA4F',
							marginBottom : 20
						},
						c : MSG('MODIFY_MASTER_INFO_TITLE')
					}),
					
					form = UUI.VALID_FORM({
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
						
						Yogurt.Submit({
							style : {
								marginTop : 10
							},
							value : MSG('SAVE_MASTER_INFO_BUTTON')
						})
						],
						on : {
							submit : (e, form) => {
								
								let data = form.getData();
								
								data.id = walletAddress;
								
								EtherFairy.MasterModel.update(data, {
									notValid : form.showErrors,
									success : () => {
										EtherFairy.GO('master');
									}
								});
							}
						}
					})]
				}));
				
				form.setData(masterData);
			});
		});
	}
});
