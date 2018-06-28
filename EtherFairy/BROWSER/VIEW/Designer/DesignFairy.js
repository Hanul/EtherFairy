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
				
				let availablePoints = 5;
				
				let hpPointPerLevel = 0;
				let attackPointPerLevel = 0;
				let defensePointPerLevel = 0;
				let agilityPointPerLevel = 0;
				let dexterityPointPerLevel = 0;
				let firePointPerLevel = 0;
				let waterPointPerLevel = 0;
				let windPointPerLevel = 0;
				let earthPointPerLevel = 0;
				let lightPointPerLevel = 0;
				let darkPointPerLevel = 0;
				
				let previewWrapper;
				let fairyRootPercentPanel;
				let availablePointsPanel;
				let pointsFormWrapper;
				
				let hpPointPerLevelPanel;
				let attackPointPerLevelPanel;
				let defensePointPerLevelPanel;
				let agilityPointPerLevelPanel;
				let dexterityPointPerLevelPanel;
				let firePointPerLevelPanel;
				let waterPointPerLevelPanel;
				let windPointPerLevelPanel;
				let earthPointPerLevelPanel;
				let lightPointPerLevelPanel;
				let darkPointPerLevelPanel;
				
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
					
					DIV({
						style : {
							width : 400,
							flt : 'left'
						},
						c : [
						H2({
							style : {
								marginBottom : 10
							},
							c : MSG('FAIRY_IMAGE_UPLOAD')
						}),
						previewWrapper = DIV(),
						UUI.FULL_UPLOAD_FORM({
							box : EtherFairy
						}, {
							success : (fileInfo, uploadForm) => {
								
								previewWrapper.empty();
								previewWrapper.append(IMG({
									style : {
										width : '100%'
									},
									src : EtherFairy.RF(fileInfo.id)
								}));
								
								//TODO: 이미지 ID 저장해야함
							}
						}),]
					}),
					
					UUI.VALID_FORM({
						style : {
							width : 470,
							marginLeft : 20,
							flt : 'left'
						},
						errorMsgs : {
						},
						errorMsgStyle : {
							marginTop : 5,
							color : 'red'
						},
						c : [
						H2({
							style : {
								marginBottom : 10
							},
							c : MSG('FAIRY_INFO_FORM')
						}),
						
						UUI.FULL_INPUT({
							placeholder : MSG('FAIRY_ORIGIN_NAME')
						}),
						
						P({
							c : MSG('FAIRY_ORIGIN_NAME_DESCRIPTION')
						}),
						
						DIV({
							style : {
								marginTop : 30,
							},
							c : [H3({
								c : MSG('FAIRY_ROOT_PERCENT')
							}),
							fairyRootPercentPanel = DIV({
								c : '10%'
							}),
							Yogurt.Range({
								name : 'fairyRootPercent',
								min : 10,
								max : 90,
								step : 2,
								on : {
									change : (e, range) => {
										fairyRootPercentPanel.empty();
										fairyRootPercentPanel.append(range.getValue() + '%');
										
										availablePoints = range.getValue() / 2;
										availablePointsPanel.empty();
										availablePointsPanel.append(MSG('AVAILABLE_POINTS') + ' : ' + availablePoints);
										
										refreshPointsForm();
									}
								}
							}),
							P({
								c : MSG('FAIRY_ROOT_PERCENT_DESCRIPTION')
							})]
						}),
						
						DIV({
							style : {
								marginTop : 30
							},
							c : [
							availablePointsPanel = DIV({
								c : MSG('AVAILABLE_POINTS') + ' : ' + availablePoints
							}),
							
							pointsFormWrapper = DIV()]
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
								
								console.log(data);
								//TODO:
							}
						}
					}),
					
					CLEAR_BOTH()]
				}));
				
				let getUsingPoints = (exceptPoint) => {
					return hpPointPerLevel +
						attackPointPerLevel +
						defensePointPerLevel +
						agilityPointPerLevel +
						dexterityPointPerLevel +
						firePointPerLevel +
						waterPointPerLevel +
						windPointPerLevel +
						earthPointPerLevel +
						lightPointPerLevel +
						darkPointPerLevel -
						exceptPoint;
				};
				
				let refreshPointsForm = RAR(() => {
					
					pointsFormWrapper.empty();
					pointsFormWrapper.append(DIV({
						c : [
						
						// HP
						H3({
							style : {
								marginTop : 15
							},
							c : MSG('HP_POINT_PER_LEVEL')
						}),
						hpPointPerLevelPanel = DIV({
							c : hpPointPerLevel
						}),
						Yogurt.Range({
							name : 'hpPointPerLevel',
							max : availablePoints - getUsingPoints(hpPointPerLevel),
							value : hpPointPerLevel,
							on : {
								show : (e, range) => {
									hpPointPerLevel = range.getValue();
									
									hpPointPerLevelPanel.empty();
									hpPointPerLevelPanel.append(hpPointPerLevel);
								},
								change : (e, range) => {
									hpPointPerLevel = range.getValue();
									
									hpPointPerLevelPanel.empty();
									hpPointPerLevelPanel.append(hpPointPerLevel);
								}
							}
						}),
						
						// ATTACK
						H3({
							c : MSG('ATTACK_POINT_PER_LEVEL')
						}),
						attackPointPerLevelPanel = DIV({
							c : attackPointPerLevel
						}),
						Yogurt.Range({
							name : 'attackPointPerLevel',
							max : availablePoints - getUsingPoints(attackPointPerLevel),
							value : attackPointPerLevel,
							on : {
								show : (e, range) => {
									attackPointPerLevel = range.getValue();
									
									attackPointPerLevelPanel.empty();
									attackPointPerLevelPanel.append(attackPointPerLevel);
								},
								change : (e, range) => {
									attackPointPerLevel = range.getValue();
									
									attackPointPerLevelPanel.empty();
									attackPointPerLevelPanel.append(attackPointPerLevel);
								}
							}
						}),
						
						// DEFENCE
						H3({
							c : MSG('DEFENCE_POINT_PER_LEVEL')
						}),
						defensePointPerLevelPanel = DIV({
							c : defensePointPerLevel
						}),
						Yogurt.Range({
							name : 'defensePointPerLevel',
							max : availablePoints - getUsingPoints(defensePointPerLevel),
							value : defensePointPerLevel,
							on : {
								show : (e, range) => {
									defensePointPerLevel = range.getValue();
									
									defensePointPerLevelPanel.empty();
									defensePointPerLevelPanel.append(defensePointPerLevel);
								},
								change : (e, range) => {
									defensePointPerLevel = range.getValue();
									
									defensePointPerLevelPanel.empty();
									defensePointPerLevelPanel.append(defensePointPerLevel);
								}
							}
						}),
						
						// AGILITY
						H3({
							c : MSG('AGILITY_POINT_PER_LEVEL')
						}),
						agilityPointPerLevelPanel = DIV({
							c : agilityPointPerLevel
						}),
						Yogurt.Range({
							name : 'agilityPointPerLevel',
							max : availablePoints - getUsingPoints(agilityPointPerLevel),
							value : agilityPointPerLevel,
							on : {
								show : (e, range) => {
									agilityPointPerLevel = range.getValue();
									
									agilityPointPerLevelPanel.empty();
									agilityPointPerLevelPanel.append(agilityPointPerLevel);
								},
								change : (e, range) => {
									agilityPointPerLevel = range.getValue();
									
									agilityPointPerLevelPanel.empty();
									agilityPointPerLevelPanel.append(agilityPointPerLevel);
								}
							}
						}),
						
						// DEXTERITY
						H3({
							c : MSG('DEXTERITY_POINT_PER_LEVEL')
						}),
						dexterityPointPerLevelPanel = DIV({
							c : dexterityPointPerLevel
						}),
						Yogurt.Range({
							name : 'dexterityPointPerLevel',
							max : availablePoints - getUsingPoints(dexterityPointPerLevel),
							value : dexterityPointPerLevel,
							on : {
								show : (e, range) => {
									dexterityPointPerLevel = range.getValue();
									
									dexterityPointPerLevelPanel.empty();
									dexterityPointPerLevelPanel.append(dexterityPointPerLevel);
								},
								change : (e, range) => {
									dexterityPointPerLevel = range.getValue();
									
									dexterityPointPerLevelPanel.empty();
									dexterityPointPerLevelPanel.append(dexterityPointPerLevel);
								}
							}
						}),
						
						// FIRE
						H3({
							c : MSG('FIRE_POINT_PER_LEVEL')
						}),
						firePointPerLevelPanel = DIV({
							c : firePointPerLevel
						}),
						Yogurt.Range({
							name : 'firePointPerLevel',
							max : availablePoints - getUsingPoints(firePointPerLevel),
							value : firePointPerLevel,
							on : {
								show : (e, range) => {
									firePointPerLevel = range.getValue();
									
									firePointPerLevelPanel.empty();
									firePointPerLevelPanel.append(firePointPerLevel);
								},
								change : (e, range) => {
									firePointPerLevel = range.getValue();
									
									firePointPerLevelPanel.empty();
									firePointPerLevelPanel.append(firePointPerLevel);
								}
							}
						}),
						
						// WATER
						H3({
							c : MSG('WATER_POINT_PER_LEVEL')
						}),
						waterPointPerLevelPanel = DIV({
							c : waterPointPerLevel
						}),
						Yogurt.Range({
							name : 'waterPointPerLevel',
							max : availablePoints - getUsingPoints(waterPointPerLevel),
							value : waterPointPerLevel,
							on : {
								show : (e, range) => {
									waterPointPerLevel = range.getValue();
									
									waterPointPerLevelPanel.empty();
									waterPointPerLevelPanel.append(waterPointPerLevel);
								},
								change : (e, range) => {
									waterPointPerLevel = range.getValue();
									
									waterPointPerLevelPanel.empty();
									waterPointPerLevelPanel.append(waterPointPerLevel);
								}
							}
						}),
						
						// WIND
						H3({
							c : MSG('WIND_POINT_PER_LEVEL')
						}),
						windPointPerLevelPanel = DIV({
							c : windPointPerLevel
						}),
						Yogurt.Range({
							name : 'windPointPerLevel',
							max : availablePoints - getUsingPoints(windPointPerLevel),
							value : windPointPerLevel,
							on : {
								show : (e, range) => {
									windPointPerLevel = range.getValue();
									
									windPointPerLevelPanel.empty();
									windPointPerLevelPanel.append(windPointPerLevel);
								},
								change : (e, range) => {
									windPointPerLevel = range.getValue();
									
									windPointPerLevelPanel.empty();
									windPointPerLevelPanel.append(windPointPerLevel);
								}
							}
						}),
						
						// EARTH
						H3({
							c : MSG('EARTH_POINT_PER_LEVEL')
						}),
						earthPointPerLevelPanel = DIV({
							c : earthPointPerLevel
						}),
						Yogurt.Range({
							name : 'earthPointPerLevel',
							max : availablePoints - getUsingPoints(earthPointPerLevel),
							value : earthPointPerLevel,
							on : {
								show : (e, range) => {
									earthPointPerLevel = range.getValue();
									
									earthPointPerLevelPanel.empty();
									earthPointPerLevelPanel.append(earthPointPerLevel);
								},
								change : (e, range) => {
									earthPointPerLevel = range.getValue();
									
									earthPointPerLevelPanel.empty();
									earthPointPerLevelPanel.append(earthPointPerLevel);
								}
							}
						}),
						
						// LIGHT
						H3({
							c : MSG('LIGHT_POINT_PER_LEVEL')
						}),
						lightPointPerLevelPanel = DIV({
							c : lightPointPerLevel
						}),
						Yogurt.Range({
							name : 'lightPointPerLevel',
							max : availablePoints - getUsingPoints(lightPointPerLevel),
							value : lightPointPerLevel,
							on : {
								show : (e, range) => {
									lightPointPerLevel = range.getValue();
									
									lightPointPerLevelPanel.empty();
									lightPointPerLevelPanel.append(lightPointPerLevel);
								},
								change : (e, range) => {
									lightPointPerLevel = range.getValue();
									
									lightPointPerLevelPanel.empty();
									lightPointPerLevelPanel.append(lightPointPerLevel);
								}
							}
						}),
						
						// DARK
						H3({
							c : MSG('DARK_POINT_PER_LEVEL')
						}),
						darkPointPerLevelPanel = DIV({
							c : darkPointPerLevel
						}),
						Yogurt.Range({
							name : 'darkPointPerLevel',
							max : availablePoints - getUsingPoints(darkPointPerLevel),
							value : darkPointPerLevel,
							on : {
								show : (e, range) => {
									darkPointPerLevel = range.getValue();
									
									darkPointPerLevelPanel.empty();
									darkPointPerLevelPanel.append(darkPointPerLevel);
								},
								change : (e, range) => {
									darkPointPerLevel = range.getValue();
									
									darkPointPerLevelPanel.empty();
									darkPointPerLevelPanel.append(darkPointPerLevel);
								}
							}
						})]
					}));
				});
				
				let touchendEvent = EVENT('touchend', refreshPointsForm);
				pointsFormWrapper.on('remove', () => {
					touchendEvent.remove();
				});
			}
		});
	}
});
