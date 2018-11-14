EtherFairy('Master').Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		// 메타마스크가 설치되어 있는 경우
		if (Contract2Object.checkWalletEnable() === true) {
			Contract2Object.getWalletAddress((walletAddress) => {
				
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
							let profileImageUploadForm;
							let fairyCountPanel;
							let fairyList;
							
							EtherFairy.Layout.setContent(DIV({
								style : {
									margin : 'auto',
									width : 1110,
									padding : '30px 0 50px 10px'
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
											backgroundRepeat : 'no-repeat',
											cursor : 'pointer',
											borderRadius : 10
										},
										on : {
											mouseover : () => {
												
												if (profileImage.getChildren().length === 0) {
													
													profileImage.append(UUI.V_CENTER({
														style : {
															width : 200,
															height : 200,
															background : 'rgba(0, 0, 0, 0.5)',
															borderRadius : 10,
															textAlign : 'center'
														},
														c : MSG('CHANGE_PROFILE_IMAGE_BUTTON'),
														on : {
															mouseout : () => {
																profileImage.empty();
															}
														}
													}));
												}
											},
											tap : () => {
												profileImageUploadForm.select();
											}
										}
									}),
									
									profileImageUploadForm = UUI.FULL_UPLOAD_FORM({
										style : {
											position : 'fixed',
											left : -999999,
											top : -999999
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
										marginLeft : 20,
										flt : 'left'
									},
									c : [fairyCountPanel = DIV()]
								}),
								
								CLEAR_BOTH(),
								
								H3({
									style : {
										marginTop : 30,
										fontSize : 25
									},
									c : MSG('OWNER_HOME_OWNED_FAIRY_LIST')
								}),
								
								fairyList = DIV({
									style : {
										marginTop : 10
									},
									c : IMG({
										style : {
											width : 100
										},
										src : EtherFairy.R('loading.svg')
									})
								})]
							}));
							
							EtherFairy.EtherFairyContract.balanceOf(walletAddress, (fairyCount) => {
								
								fairyCountPanel.append(MSG('OWNER_HOME_OWNED_FAIRY_COUNT') + ' : ' + fairyCount);
								
								fairyList.empty();
								
								REPEAT(fairyCount, (i) => {
									
									let fairyCardWrapper = DIV().appendTo(fairyList);
									
									EtherFairy.EtherFairyContract.masterToFairyIds({
										walletAddress : walletAddress,
										i : i
									}, (fairyId) => {
										
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
