EtherFairy('Company').DesignerIdentity = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.EtherFairyContract.company((companyAddress) => {
			
			Contract2Object.getWalletAddress((walletAddress) => {
				
				if (walletAddress === companyAddress) {
					
					let list;
					EtherFairy.Layout.setContent(UUI.PANEL({
						style : {
							margin : 'auto',
							onDisplayResize : (width, height) => {
								if (width < 800) {
									return {
										width : '100%'
									};
								} else {
									return {
										width : 800
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
							c : '디자이너 Identity 관리'
						}),
						
						list = TABLE({
							style : {
								marginTop : 20
							},
							c : TR({
								c : [TH({
									c : 'ID'
								}), TH({
									c : '실명'
								}), TH({
									c : '이메일'
								}), TH({
									c : '전화번호'
								}), TH({
									c : '가입 여부'
								})]
							})
						})]
					}));
					
					EtherFairy.DesignerIdentityModel.find((designerIdentityDataSet) => {
						
						EACH(designerIdentityDataSet, (designerIdentityData) => {
							
							let checkExistsPanel;
							
							list.append(TR({
								c : [TD({
									c : A({
										c : designerIdentityData.id,
										href : EtherFairy.HREF('designer/join/' + designerIdentityData.id)
									})
								}), TD({
									c : designerIdentityData.name
								}), TD({
									c : designerIdentityData.email
								}), TD({
									c : designerIdentityData.phoneNumber
								}), checkExistsPanel = TD()]
							}));
							
							EtherFairy.DesignerModel.checkExists({
								filter : {
									identityCode : designerIdentityData.id
								}
							}, (exists) => {
								checkExistsPanel.append(exists);
							});
						});
					});
				}
			});
		});
	}
});
