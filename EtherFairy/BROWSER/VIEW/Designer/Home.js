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
						padding : '30px 0 50px 10px',
						onDisplayResize : (width, height) => {
							if (width < 400) {
								return {
									width : 310
								};
							} else if (width < 620) {
								return {
									width : 380
								};
							} else if (width < 800) {
								return {
									width : 570
								};
							} else if (width < 1300) {
								return {
									width : 760
								};
							} else if (width < 1550) {
								return {
									width : 740
								};
							} else {
								return {
									width : 1110
								};
							}
						}
					},
					c : [
					H1({
						style : {
							fontSize : 30,
							fontWeight : 'bold',
							color : '#ffd964',
							textShadow : EtherFairy.TextBorderShadow('#382109'),
							marginBottom : 20,
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										textAlign : 'center'
									};
								} else {
									return {
										textAlign : 'left'
									};
								}
							}
						},
						c : signedDesignerData.nickname
					}), 
					
					DIV({
						style : {
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										flt : 'none'
									};
								} else {
									return {
										flt : 'left'
									};
								}
							}
						},
						c : [profileImage = DIV({
							style : {
								width : 200,
								height : 200,
								backgroundImage : signedDesignerData.profileImageFileId === undefined ? EtherFairy.R('default-profile.png') : EtherFairy.RF(signedDesignerData.profileImageFileId),
								backgroundSize : 'cover',
								backgroundPosition : 'center center',
								backgroundRepeat : 'no-repeat',
								borderRadius : 10,
								onDisplayResize : (width, height) => {
									if (width < 620) {
										return {
											margin : 'auto'
										};
									} else {
										return {
											margin : 0
										};
									}
								}
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
							position : 'relative',
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										marginTop : 20,
										marginLeft : 0,
										flt : 'none',
										textAlign : 'center',
										height : 'auto'
									};
								} else {
									return {
										marginTop : 0,
										marginLeft : 20,
										flt : 'left',
										textAlign : 'left',
										height : 200
									};
								}
							}
						},
						c : [fairyOriginCountPanel = DIV({
							style : {
								color : '#fff4e7',
								textShadow : EtherFairy.ThinTextBorderShadow('#775228')
							}
						}),
						
						DIV({
							style : {
								width : 250,
								bottom : 0,
								onDisplayResize : (width, height) => {
									if (width < 620) {
										return {
											margin : 'auto',
											position : 'relative'
										};
									} else {
										return {
											margin : 0,
											position : 'absolute'
										};
									}
								}
							},
							c : [Yogurt.Button({
								style : {
									marginTop : 20
								},
								c : MSG('UPDATE_DESIGNER_INFO_BUTTON'),
								on : {
									tap : () => {
										EtherFairy.GO('designer/updateinfo');
									}
								}
							}),
							
							Yogurt.Button({
								style : {
									marginTop : 10
								},
								c : MSG('DESIGN_FAIRY'),
								on : {
									tap : () => {
										EtherFairy.GO('designer/designfairy');
									}
								}
							})]
						})]
					}),
					
					CLEAR_BOTH(),
					
					H3({
						style : {
							marginTop : 30,
							fontSize : 25,
							color : '#fff4e7',
							textShadow : EtherFairy.ThinTextBorderShadow('#775228'),
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										textAlign : 'center'
									};
								} else {
									return {
										textAlign : 'left'
									};
								}
							}
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
							src : EtherFairy.R('loading.png')
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
