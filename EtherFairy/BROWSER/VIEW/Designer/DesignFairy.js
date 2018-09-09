EtherFairy('Designer').DesignFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.DesignerModel.checkSigned({
			fail : () => {
				EtherFairy.GO('designer/start');
			},
			success : (signedDesignerData) => {
				
				let imageFileId;
				
				let availablePoints = 5;
				
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
								
								imageFileId = fileInfo.id;
							}
						})]
					}),
					
					UUI.VALID_FORM({
						style : {
							width : 470,
							marginLeft : 20,
							flt : 'left'
						},
						c : [
						H2({
							style : {
								marginBottom : 10
							},
							c : MSG('FAIRY_INFO_FORM')
						}),
						
						UUI.FULL_INPUT({
							name : 'name',
							placeholder : MSG('FAIRY_ORIGIN_NAME')
						}),
						
						P({
							c : MSG('FAIRY_ORIGIN_NAME_DESCRIPTION')
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
								
								data.designerId = signedDesignerData.id;
								data.imageFileId = imageFileId;
								
								EtherFairy.FairyOriginModel.create(data, {
									notValid : (validErrors) => {
										
										// 이름 검사 실패
										if (validErrors.name !== undefined) {
											let type = validErrors.name.type;
											let validParams = validErrors.name.validParams;
											
											if (type === 'notEmpty') {
												Yogurt.Alert({
													msg : MSG('NOT_VALID_NAME_NOT_EMPTY')
												});
											}
											
											else if (type === 'size') {
												Yogurt.Alert({
													msg : MSG('NOT_VALID_NAME_SIZE').replace(/{min}/, validParams.min).replace(/{max}/, validParams.max)
												});
											}
										}
										
										// 이미지 등록 실패
										else if (validErrors.imageFileId !== undefined) {
											let type = validErrors.imageFileId.type;
											let validParams = validErrors.imageFileId.validParams;
											
											if (type === 'notEmpty') {
												Yogurt.Alert({
													msg : MSG('NOT_VALID_IMAGE_FILE_ID_NOT_EMPTY')
												});
											}
										}
									},
									success : (savedData) => {
										EtherFairy.GO('fairyorigin/' + savedData.id);
									}
								});
							}
						}
					}),
					
					CLEAR_BOTH()]
				}));
				
				let getUsingPoints = (exceptPoint) => {
					return firePointPerLevel +
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
