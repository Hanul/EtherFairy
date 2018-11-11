EtherFairy('Master').BuyFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let totalFairyOriginInfoPanel;
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
				c : MSG('FAIRY_ORIGIN_LIST')
			}),
			
			totalFairyOriginInfoPanel = DIV(),
			
			fairyOriginList = DIV({
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.svg')
				})
			})]
		}));
		
		EtherFairy.FairyOriginModel.find({
			count : 20
		}, (fairyOriginDataSet) => {
			
			totalFairyOriginInfoPanel.append(MSG('TOTAL_FAIRY_ORIGIN_COUNT') + ' : ' + fairyOriginDataSet.length);
			
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
