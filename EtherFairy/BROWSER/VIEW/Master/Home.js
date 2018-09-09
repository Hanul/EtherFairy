EtherFairy('Master').Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		// 메타마스크가 설치되어 있는 경우
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
				
				// 소유주가 존재하는지 체크
				EtherFairy.MasterModel.checkExists(walletAddress, (exists) => {
					
					// 존재하지 않으면, 생성
					if (exists !== true) {
						Yogurt.Prompt(MSG('PLEASE_ENTER_MASTER_NAME'), (value) => {
							
							EtherFairy.MasterModel.create({
								id : walletAddress,
								name : value
							}, () => {
								EtherFairy.REFRESH('master');
							});
						});
					}
					
					else {
						
						EtherFairy.MasterModel.get(walletAddress, (masterData) => {
							
							let profileImage;
							let fairyList;
							
							EtherFairy.Layout.setContent(UUI.PANEL({
								style : {
									padding : 10
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
									c : masterData.nickname
								}),
								
								DIV({
									style : {
										flt : 'left'
									},
									c : [profileImage = DIV({
										style : {
											width : 200,
											height : 200,
											backgroundImage : masterData.profileImageFileId === undefined ? EtherFairy.R('default-profile.png') : EtherFairy.RF(masterData.profileImageFileId),
											backgroundSize : 'cover',
											backgroundPosition : 'center center',
											backgroundRepeat : 'no-repeat'
										}
									}),
									
									UUI.FULL_UPLOAD_FORM({
										style : {
											width : 190
										},
										box : EtherFairy
									}, {
										success : (fileInfo, uploadForm) => {
											
											profileImage.addStyle({
												backgroundImage : EtherFairy.RF(fileInfo.id)
											});
											
											EtherFairy.MasterModel.update({
												id : walletAddress,
												profileImageFileId : fileInfo.id
											});
										}
									})]
								}),
								
								DIV({
									style : {
										marginLeft : 10,
										flt : 'left'
									},
									c : ['test']
								}),
								
								CLEAR_BOTH(),
								
								fairyList = DIV({
									style : {
										margin : 'auto',
										width : 930,
										paddingLeft : 10
									},
									c : IMG({
										style : {
											width : 100
										},
										src : EtherFairy.R('loading.svg')
									})
								})]
							}));
							
							EtherFairy.EtherFairyContractController.balanceOf(walletAddress, (fairyCount) => {
								
								fairyList.empty();
								
								REPEAT(fairyCount, (i) => {
									
									let fairyCardWrapper = DIV().appendTo(fairyList);
									
									EtherFairy.EtherFairyContractController.getFairyId(walletAddress, i, (fairyId) => {
										
										fairyCardWrapper.append(EtherFairy.FairyCard({
											style : {
												marginTop : 10,
												marginRight : 10,
												flt : 'left',
												cursor : 'pointer'
											},
											fairyId : fairyId,
											on : {
												tap : () => {
													EtherFairy.GO('fairy/' + fairyId);
												}
											}
										}));
									});
								});
								
								fairyList.append(CLEAR_BOTH());
							});
						});
					}
				});
			});
		}
		
		// 설치가 되어있지 않으면, 시작하기 화면으로 이동
		else {
			EtherFairy.GO('start');
		}
	}
});
