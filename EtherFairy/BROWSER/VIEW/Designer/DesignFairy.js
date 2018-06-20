EtherFairy('Designer').DesignFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('designer/start');
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
						H3({
							c : MSG('FAIRY_ROOT_PERCENT')
						}),
						Yogurt.Range({
							name : 'fairyRootPercent'
						}),
						
						H3({
							c : MSG('HP_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'hpPointPerLevel'
						}),
						
						H3({
							c : MSG('ATTACK_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'attackPointPerLevel'
						}),
						
						H3({
							c : MSG('DEFENCE_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'defensePointPerLevel'
						}),
						
						H3({
							c : MSG('AGILITY_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'agilityPointPerLevel'
						}),
						
						H3({
							c : MSG('DEXTERITY_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'dexterityPointPerLevel'
						}),
						
						H3({
							c : MSG('FIRE_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'firePointPerLevel'
						}),
						
						H3({
							c : MSG('WATER_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'waterPointPerLevel'
						}),
						
						H3({
							c : MSG('WIND_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'windPointPerLevel'
						}),
						
						H3({
							c : MSG('EARTH_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'earthPointPerLevel'
						}),
						
						H3({
							c : MSG('LIGHT_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'lightPointPerLevel'
						}),
						
						H3({
							c : MSG('DARK_POINT_PER_LEVEL')
						}),
						Yogurt.Range({
							name : 'darkPointPerLevel'
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
