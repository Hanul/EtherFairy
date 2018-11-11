EtherFairy('Designer').Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('designer/start');
			},
			success : (signedDesignerData) => {
				
				let profileImage;
				let profileImageUploadForm;
				let fairyOriginCountPanel;
				let fairyOriginList;
				
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
						c : signedDesignerData.nickname
					}), 
					
					DIV({
						style : {
							flt : 'left'
						},
						c : [profileImage = DIV({
							style : {
								width : 200,
								height : 200,
								backgroundImage : signedDesignerData.profileImageFileId === undefined ? EtherFairy.R('default-profile.png') : EtherFairy.RF(signedDesignerData.profileImageFileId),
								backgroundSize : 'cover',
								backgroundPosition : 'center center',
								backgroundRepeat : 'no-repeat',
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
								
								EtherFairy.DesignerModel.update({
									id : signedDesignerData.id,
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
						c : [fairyOriginCountPanel = DIV(), 
						
						Yogurt.Button({
							style : {
								marginTop : 20
							},
							c : MSG('DESIGN_FAIRY'),
							on : {
								tap : () => {
									EtherFairy.GO('designer/designfairy');
								}
							}
						})]
					}),
					
					CLEAR_BOTH(),
					
					H3({
						style : {
							marginTop : 30,
							fontSize : 25
						},
						c : MSG('DESIGNER_HOME_DESIGNED_FAIRY_LIST')
					}),
					
					fairyOriginList = DIV({
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
				
				EtherFairy.FairyOriginModel.find({
					filter : {
						designerId : signedDesignerData.id
					},
					isToFindAll : true
				}, (fairyOriginDataSet) => {
					
					fairyOriginCountPanel.append(MSG('DESIGNER_HOME_DESIGNED_FAIRY_COUNT') + ' : ' + fairyOriginDataSet.length);
					
					fairyOriginList.empty();
					
					EACH(fairyOriginDataSet, (fairyOriginData) => {
						
						fairyOriginList.append(EtherFairy.FairyOriginCard({
							style : {
								marginTop : 10,
								marginRight : 10,
								flt : 'left',
								cursor : 'pointer',
								onDisplayResize : (width, height) => {
									if (width < 400) {
										return {
											transform : 'scale(0.4)',
											transformOrigin : 'left top',
											width : 144,
											height : 220
										};
									} else if (width < 1300) {
										return {
											transform : 'scale(0.5)',
											transformOrigin : 'left top',
											width : 180,
											height : 275
										};
									} else {
										return {
											transform : TO_DELETE,
											transformOrigin : TO_DELETE,
											width : 360,
											height : 550
										};
									}
								}
							},
							fairyOriginData : fairyOriginData,
							on : {
								tap : () => {
									EtherFairy.GO('fairyorigin/' + fairyOriginData.id);
								}
							}
						}));
					});
					
					fairyOriginList.append(CLEAR_BOTH());
				});
			}
		});
	}
});
