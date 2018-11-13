EtherFairy('Designer').DesignFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			NEXT([
			(next) => {
				if (fairyOriginId === undefined) {
					next();
				} else {
					EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
						
						if (fairyOriginData.isPublished === true) {
							Yogurt.Alert(MSG('CANNOT_MODIFY_FAIRY'));
						}
						
						else {
							next(fairyOriginData);
						}
					});
				}
			},
			
			() => {
				return (fairyOriginData) => {
					
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
							
							if (fairyOriginData !== undefined) {
								
								imageFileId = fairyOriginData.imageFileId;
								
								firePointPerLevel = fairyOriginData.firePointPerLevel;
								waterPointPerLevel = fairyOriginData.waterPointPerLevel;
								windPointPerLevel = fairyOriginData.windPointPerLevel;
								earthPointPerLevel = fairyOriginData.earthPointPerLevel;
								lightPointPerLevel = fairyOriginData.lightPointPerLevel;
								darkPointPerLevel = fairyOriginData.darkPointPerLevel;
								
								availablePoints = 5 - firePointPerLevel - waterPointPerLevel - windPointPerLevel - earthPointPerLevel - lightPointPerLevel - darkPointPerLevel;
							}
							
							let availablePointsPanel;
							
							let preview;
							let uploadForm;
							let nameInput;
							
							let firePointPerLevelPanel;
							let waterPointPerLevelPanel;
							let windPointPerLevelPanel;
							let earthPointPerLevelPanel;
							let lightPointPerLevelPanel;
							let darkPointPerLevelPanel;
							
							let firePointPerLevelIconPanel;
							let waterPointPerLevelIconPanel;
							let windPointPerLevelIconPanel;
							let earthPointPerLevelIconPanel;
							let lightPointPerLevelIconPanel;
							let darkPointPerLevelIconPanel;
							
							let getTotalPoint = () => {
								return firePointPerLevel +
									waterPointPerLevel +
									windPointPerLevel +
									earthPointPerLevel +
									lightPointPerLevel +
									darkPointPerLevel;
							};
							
							let changePoint = (type, amount) => {
								
								let nowTotalPoint = getTotalPoint();
								
								if (nowTotalPoint + amount > 5) {
									amount = 5 - nowTotalPoint;
								}
								
								if (type === 'fire') {
									
									if (firePointPerLevel + amount < 0) {
										amount = 0;
									}
									firePointPerLevel += amount;
									
									firePointPerLevelPanel.empty();
									firePointPerLevelPanel.append(firePointPerLevel);
									
									firePointPerLevelIconPanel.empty();
									firePointPerLevelIconPanel.append(firePointPerLevel);
								}
								
								if (type === 'water') {
									
									if (waterPointPerLevel + amount < 0) {
										amount = 0;
									}
									waterPointPerLevel += amount;
									
									waterPointPerLevelPanel.empty();
									waterPointPerLevelPanel.append(waterPointPerLevel);
									
									waterPointPerLevelIconPanel.empty();
									waterPointPerLevelIconPanel.append(waterPointPerLevel);
								}
								
								if (type === 'wind') {
									
									if (windPointPerLevel + amount < 0) {
										amount = 0;
									}
									windPointPerLevel += amount;
									
									windPointPerLevelPanel.empty();
									windPointPerLevelPanel.append(windPointPerLevel);
									
									windPointPerLevelIconPanel.empty();
									windPointPerLevelIconPanel.append(windPointPerLevel);
								}
								
								if (type === 'earth') {
									
									if (earthPointPerLevel + amount < 0) {
										amount = 0;
									}
									earthPointPerLevel += amount;
									
									earthPointPerLevelPanel.empty();
									earthPointPerLevelPanel.append(earthPointPerLevel);
									
									earthPointPerLevelIconPanel.empty();
									earthPointPerLevelIconPanel.append(earthPointPerLevel);
								}
								
								if (type === 'light') {
									
									if (lightPointPerLevel + amount < 0) {
										amount = 0;
									}
									lightPointPerLevel += amount;
									
									lightPointPerLevelPanel.empty();
									lightPointPerLevelPanel.append(lightPointPerLevel);
									
									lightPointPerLevelIconPanel.empty();
									lightPointPerLevelIconPanel.append(lightPointPerLevel);
								}
								
								if (type === 'dark') {
									
									if (darkPointPerLevel + amount < 0) {
										amount = 0;
									}
									darkPointPerLevel += amount;
									
									darkPointPerLevelPanel.empty();
									darkPointPerLevelPanel.append(darkPointPerLevel);
									
									darkPointPerLevelIconPanel.empty();
									darkPointPerLevelIconPanel.append(darkPointPerLevel);
								}
								
								availablePointsPanel.empty();
								availablePointsPanel.append(5 - getTotalPoint());
							};
							
							EtherFairy.Layout.setContent(UUI.PANEL({
								style : {
									padding : '40px 0 60px'
								},
								contentStyle : {
									margin : 'auto',
									width : 801,
									height : 1340,
									backgroundImage : EtherFairy.R('designfairy/background.png'),
									textAlign : 'center'
								},
								c : [
								
								H1({
									style : {
										paddingTop : 15,
										fontSize : 30,
										fontWeight : 'bold',
										color : '#ffde5c',
										textShadow : EtherFairy.TextBorderShadow('#160b00')
									},
									c : MSG('DESIGN_FAIRY')
								}),
								
								uploadForm = UUI.FULL_UPLOAD_FORM({
									style : {
										position : 'fixed',
										left : -999999,
										top : -999999
									},
									box : EtherFairy
								}, {
									success : (fileInfo, uploadForm) => {
										
										preview.empty();
										preview.addStyle({
											backgroundImage : EtherFairy.RF(fileInfo.id)
										});
										
										imageFileId = fileInfo.id;
									}
								}),
								
								DIV({
									style : {
										position : 'relative',
										margin : 'auto',
										marginTop : 40,
										width : 360,
										height : 550,
										backgroundImage : EtherFairy.R('origincard.png')
									},
									c : [DIV({
										style : {
											paddingTop : 12,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : '(' + MSG('DESIGN_FAIRY_FAIRY_NAME_DESCRIPTION') + ')'
									}),
									
									// 이미지 업로드
									preview = UUI.V_CENTER({
										style : {
											position : 'absolute',
											left : 10,
											top : 43,
											width : 339,
											height : 399,
											textAlign : 'center',
											borderRadius : 6,
											backgroundSize : 'cover',
											backgroundPosition : 'center center',
											cursor : 'pointer',
											color : '#999',
											backgroundImage : imageFileId === undefined ? undefined : EtherFairy.RF(imageFileId)
										},
										c : imageFileId !== undefined ? undefined : [MSG('PLEASE_FILE_UPLOAD'), FontAwesome.GetIcon({
											style : {
												marginTop : 20,
												display : 'block',
												fontSize : 30,
												textAlign : 'center'
											},
											key : 'upload'
										})],
										on : {
											tap : () => {
												uploadForm.select();
											}
										}
									}),
									
									// 속성값 표시
									DIV({
										style : {
											position : 'absolute',
											left : 16,
											bottom : 52
										},
										c : [firePointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/fire.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : firePointPerLevel
										}), waterPointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												marginLeft : 3,
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/water.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : waterPointPerLevel
										}), windPointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												marginLeft : 3,
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/wind.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : windPointPerLevel
										}), earthPointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												marginLeft : 3,
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/earth.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : earthPointPerLevel
										}), lightPointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												marginLeft : 3,
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/light.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : lightPointPerLevel
										}), darkPointPerLevelIconPanel = UUI.V_CENTER({
											style : {
												marginLeft : 3,
												flt : 'left',
												width : 52,
												height : 52,
												backgroundImage : EtherFairy.R('element/dark.png'),
												color : '#fff5ef',
												textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
												textAlign : 'center',
												fontSize : 20
											},
											c : darkPointPerLevel
										}), CLEAR_BOTH()]
									}),
									
									nameInput = UUI.FULL_INPUT({
										style : {
											position : 'absolute',
											left : 10,
											bottom : 10,
											width : 326,
											padding : 7,
											borderRadius : 4
										},
										inputStyle : {
											textAlign : 'center'
										},
										name : 'name',
										value : fairyOriginData === undefined ? undefined : fairyOriginData.name,
										placeholder : MSG('PLEASE_ENTER_FAIRY_ORIGIN_NAME')
									})]
								}),
								
								DIV({
									style : {
										width : 400,
										margin : 'auto',
										marginTop : 35
									},
									c : [H3({
										style : {
											textAlign : 'right',
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : [SPAN({
											style : {
												color : '#FFFFCC',
												marginRight : 20
											},
											c : MSG('REMAINING_STATUS_POINT_NAMETAG')
										}), availablePointsPanel = SPAN({
											c : availablePoints
										})]
									})]
								}),
								
								UUI.VALID_FORM({
									style : {
										width : 400,
										margin : 'auto',
										marginTop : 20
									},
									c : [
									
									DIV({
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('FIRE_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('fire', -1);
													}
												}
											}), firePointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : firePointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('fire', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									DIV({
										style : {
											marginTop : 20
										},
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('WATER_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('water', -1);
													}
												}
											}), waterPointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : waterPointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('water', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									DIV({
										style : {
											marginTop : 20
										},
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('WIND_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('wind', -1);
													}
												}
											}), windPointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : windPointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('wind', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									DIV({
										style : {
											marginTop : 20
										},
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('EARTH_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('earth', -1);
													}
												}
											}), earthPointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : earthPointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('earth', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									DIV({
										style : {
											marginTop : 20
										},
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('LIGHT_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('light', -1);
													}
												}
											}), lightPointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : lightPointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('light', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									DIV({
										style : {
											marginTop : 20
										},
										c : [SPAN({
											style : {
												color : '#663300',
												fontWeight : 'bold',
												flt : 'left',
												marginTop : 8
											},
											c : MSG('DARK_POINT_PER_LEVEL')
										}), DIV({
											style : {
												flt : 'right'
											},
											c : [A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/minus.png')
												}),
												on : {
													tap : () => {
														changePoint('dark', -1);
													}
												}
											}), darkPointPerLevelPanel = DIV({
												style : {
													flt : 'left',
													color : '#ffde5c',
													textShadow : EtherFairy.TextBorderShadow('#160b00'),
													marginTop : 8,
													width : 50,
													textAlign : 'center'
												},
												c : darkPointPerLevel
											}), A({
												c : IMG({
													style : {
														flt : 'left'
													},
													src : EtherFairy.R('designfairy/plus.png')
												}),
												on : {
													tap : () => {
														changePoint('dark', 1);
													}
												}
											}), CLEAR_BOTH()]
										}), CLEAR_BOTH()]
									}),
									
									UUI.FULL_TEXTAREA({
										style : {
											marginLeft : 30,
											marginTop : 35,
											width : 329,
											height : 113,
											backgroundImage : EtherFairy.R('designfairy/textarea.png')
										},
										name : 'description',
										value : fairyOriginData === undefined ? undefined : fairyOriginData.description,
										placeholder : MSG('PLEASE_ENTER_FAIRY_ORIGIN_DESCRIPTION')
									}),
									
									INPUT({
										type : 'submit',
										style : {
											marginTop : 35,
											width : 296,
											height : 97,
											backgroundColor : 'transparent',
											backgroundImage : EtherFairy.R('designfairy/save.png'),
											border : 'none',
											color : '#fff2ec',
											textShadow : EtherFairy.TextBorderShadow('#180b00'),
											fontSize : 30,
											paddingBottom : 12,
											cursor : 'pointer'
										},
										value : MSG('SAVE_DESIGN_FAIRY')
									})],
									on : {
										submit : (e, form) => {
											
											if (getTotalPoint() < 5) {
												Yogurt.Alert({
													msg : MSG('TOTAL_POINT_IS_NOT_FIVE')
												});
											}
											
											else {
												
												let data = form.getData();
												
												if (fairyOriginData !== undefined) {
													data.id = fairyOriginData.id;
												}
												
												data.name = nameInput.getValue();
												data.designerId = signedDesignerData.id;
												data.imageFileId = imageFileId;
												
												data.firePointPerLevel = firePointPerLevel;
												data.waterPointPerLevel = waterPointPerLevel;
												data.windPointPerLevel = windPointPerLevel;
												data.earthPointPerLevel = earthPointPerLevel;
												data.lightPointPerLevel = lightPointPerLevel;
												data.darkPointPerLevel = darkPointPerLevel;
												
												(fairyOriginData === undefined ? EtherFairy.FairyOriginModel.create : EtherFairy.FairyOriginModel.update)(data, {
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
														
														// 설명 검사 실패
														else if (validErrors.description !== undefined) {
															let type = validErrors.description.type;
															let validParams = validErrors.description.validParams;
															
															if (type === 'notEmpty') {
																Yogurt.Alert({
																	msg : MSG('NOT_VALID_DESCRIPTION_NOT_EMPTY')
																});
															}
															
															else if (type === 'size') {
																Yogurt.Alert({
																	msg : MSG('NOT_VALID_DESCRIPTION_SIZE').replace(/{max}/, validParams.max)
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
									}
								})]
							}));
						}
					});
				};
			}]);
		});
	}
});
