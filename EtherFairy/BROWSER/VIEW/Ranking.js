EtherFairy.Ranking = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let totalFairyInfoPanel;
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				margin : 'auto',
				width : 1110,
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
					color : '#FFEA4F',
					marginBottom : 20
				},
				c : MSG('FAIRY_LEADERBOARD_TITLE')
			}),
			
			totalFairyInfoPanel = DIV(),
			fairyList = DIV({
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.png')
				})
			})]
		}));
		
		EtherFairy.EtherFairyContract.getFairyCount((fairyCount) => {
			totalFairyInfoPanel.append(MSG('TOTAL_FAIRY_COUNT_NAMETAG') + ' : ' + fairyCount);
		});
		
		EtherFairy.EtherFairyContract.getFairyIdsByBirthTime((fairyIds) => {
			
			fairyList.empty();
			
			EACH(fairyIds, (fairyId) => {
				
				fairyList.append(EtherFairy.FairyCard({
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
									height : 240
								};
							} else if (width < 1300) {
								return {
									transform : 'scale(0.5)',
									transformOrigin : 'left top',
									width : 180,
									height : 300
								};
							} else {
								return {
									transform : TO_DELETE,
									transformOrigin : TO_DELETE,
									width : 360,
									height : 600
								};
							}
						}
					},
					fairyId : fairyId,
					on : {
						tap : () => {
							EtherFairy.GO('fairy/' + fairyId);
						}
					}
				}));
			});
			
			fairyList.append(CLEAR_BOTH());
		});
		
		EtherFairy.EtherFairyContract.getFairyIdsByBirthTime((fairyIds) => {
			console.log(fairyIds);
		});
	}
});
