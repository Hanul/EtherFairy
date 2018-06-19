EtherFairy.DesignFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('startdesigner');
			},
			success : (signedUserData) => {
				
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
						c : MSG('DESIGN_FAIRY')
					}),
					
					UUI.VALID_FORM({
						errorMsgs : {
						},
						errorMsgStyle : {
							marginTop : 5,
							color : 'red'
						},
						c : [
						INPUT({
							style : {
								width : '100%'
							},
							type : 'range'
						}),
						
						Yogurt.Submit({
							style : {
								marginTop : 10
							},
							value : MSG('SAVE_DESIGN_FAIRY')
						})
						],
						on : {
							submit : (e, form) => {
								
								let data = form.getData();
								
							}
						}
					})]
				}));
			}
		});
	}
});
