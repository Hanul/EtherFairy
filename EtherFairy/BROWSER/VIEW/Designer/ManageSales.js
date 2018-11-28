EtherFairy('Designer').ManageSales = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('designer/start');
			},
			success : (signedDesignerData) => {
				
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
