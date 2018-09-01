EtherFairy('Master').BuyFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let fairyOriginList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			H1({
				c : MSG('FAIRY_ORIGIN_LIST')
			}),
			
			fairyOriginList = DIV({
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
		
		EtherFairy.FairyOriginModel.find({
			count : 20
		}, (fairyOriginDataSet) => {
			
			fairyOriginList.empty();
			
			EACH(fairyOriginDataSet, (fairyOriginData) => {
				
				console.log(fairyOriginData);
				
				fairyOriginList.append(EtherFairy.FairyOriginCard({
					style : {
						marginTop : 10,
						marginRight : 10,
						flt : 'left',
						cursor : 'pointer'
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
