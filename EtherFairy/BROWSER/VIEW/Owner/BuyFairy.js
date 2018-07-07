EtherFairy('Owner').BuyFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : 'test'
			}),
			
			fairyList = DIV()]
		}));
		
		EtherFairy.FairyOriginModel.find({
			count : 20
		}, (fairyOriginDataSet) => {
			
			EACH(fairyOriginDataSet, (fairyOriginData) => {
				
				console.log(fairyOriginData);
				
				fairyList.append(DIV({
					style : {
						cursor : 'pointer'
					},
					c : [IMG({
						style : {
							width : 250
						},
						src : EtherFairy.RF(fairyOriginData.imageFileId)
					})],
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
