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
				
				let preview;
				let uploadForm;
				
				let firePointPerLevelPanel;
				let waterPointPerLevelPanel;
				let windPointPerLevelPanel;
				let earthPointPerLevelPanel;
				let lightPointPerLevelPanel;
				let darkPointPerLevelPanel;
				
				EtherFairy.Layout.setContent(DIV({
					style : {
						margin : 'auto',
						width : 801,
						height : 1289,
						backgroundImage : EtherFairy.R('designfairy/background.png'),
						textAlign : 'center'
					},
					c : [
					
					H1({
						style : {
							paddingTop : 30,
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
							marginTop : 50,
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
								color : '#999'
							},
							c : [MSG('PLEASE_FILE_UPLOAD'), FontAwesome.GetIcon({
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
							c : [UUI.V_CENTER({
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
								c : 0
							}), UUI.V_CENTER({
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
								c : 0
							}), UUI.V_CENTER({
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
								c : 0
							}), UUI.V_CENTER({
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
								c : 0
							}), UUI.V_CENTER({
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
								c : 0
							}), UUI.V_CENTER({
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
								c : 0
							}), CLEAR_BOTH()]
						}),
						
						UUI.FULL_INPUT({
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
							placeholder : MSG('PLEASE_ENTER_FAIRY_ORIGIN_NAME')
						})]
					}),
					
					DIV({
						style : {
							marginTop : 30,
							width : 600
						},
						c : [H3({
							style : {
								textAlign : 'right',
								color : '#ffde5c',
								textShadow : EtherFairy.TextBorderShadow('#160b00')
							},
							c : MSG('REMAIN_LEVEL_POINT') + ' : ' + 5
						})]
					}),
					
					UUI.VALID_FORM({
						style : {
							marginLeft : 20
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
						
						INPUT({
							type : 'submit',
							style : {
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
					})]
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
