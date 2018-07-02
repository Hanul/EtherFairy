EtherFairy('Designer').ManageFairyOrigin = CLASS({
	
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
						padding : 10
					},
					c : [
					
					H1({
						style : {
							fontSize : 30,
							fontWeight : 'bold',
							color : '#FFEA4F',
							textShadow : '0 0 20px #000000',
							marginBottom : 20
						},
						c : MSG('MANAGE_FAIRY_ORIGIN')
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
