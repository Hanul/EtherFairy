EtherFairy('Master').Info = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let masterAddress = params.masterAddress;
			
			EtherFairy.MasterModel.get(masterAddress, (masterData) => {
				
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
				
				EtherFairy.EtherFairyContract.balanceOf(masterAddress, (fairyCount) => {
					
					fairyCountPanel.append(MSG('OWNER_HOME_OWNED_FAIRY_COUNT') + ' : ' + fairyCount);
					
					fairyList.empty();
					
					REPEAT(fairyCount, (i) => {
						
						let fairyCardWrapper = DIV().appendTo(fairyList);
						
						EtherFairy.EtherFairyContract.masterToFairyIds({
							walletAddress : masterAddress,
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
		});
	}
});
