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
				let fairyOriginList;
				
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
						c : signedDesignerData.nickname
					}), 
					
					profileImage = DIV({
						style : {
							width : 200,
							height : 200,
							backgroundImage : signedDesignerData.profileImageFileId === undefined ? EtherFairy.R('default-profile.png') : EtherFairy.RF(signedDesignerData.profileImageFileId),
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
							
							EtherFairy.DesignerModel.update({
								id : signedDesignerData.id,
								profileImageFileId : fileInfo.id
							}, () => {
								profileImageFileId.profileImageFileId = fileInfo.id;
							});
						}
					}),
					
					fairyOriginList = DIV(),
					
					Yogurt.Button({
						c : MSG('DESIGN_FAIRY'),
						on : {
							tap : () => {
								EtherFairy.GO('designer/designfairy');
							}
						}
					})]
				}));
				
				EtherFairy.FairyOriginModel.find({
					filter : {
						designerId : signedDesignerData.id
					},
					isToFindAll : true
				}, (fairyOriginDataSet) => {
					
					EACH(fairyOriginDataSet, (fairyOriginData) => {
						
						fairyOriginList.append(A({
							c : fairyOriginData.name,
							on : {
								tap : () => {
									EtherFairy.GO('fairyorigin/' + fairyOriginData.id);
								}
							}
						}));
					});
				});
			}
		});
	}
});
