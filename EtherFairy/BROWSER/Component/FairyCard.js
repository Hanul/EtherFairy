EtherFairy.FairyCard = CLASS({
	
	preset : () => {
		return UUI.PANEL;
	},
	
	params : () => {
		return {
			contentStyle : {
				position : 'relative',
				width : 360,
				height : 600,
				backgroundImage : EtherFairy.R('cardframe/1.png'),
				boxShadow : '0 0 8px rgba(0, 0, 0, 0.8)'
			}
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.fairyId
		
		let fairyId = params.fairyId;
		
		self.append(UUI.V_CENTER({
			style : {
				position : 'absolute',
				left : 10,
				top : 43,
				width : 339,
				height : 399,
				textAlign : 'center'
			},
			c : IMG({
				src : EtherFairy.R('loading.svg')
			})
		}));
		
		let fairyInfo = {};
		PARALLEL([
		(done) => {
			EtherFairy.EtherFairyContract.getFairyBasicInfo(fairyId, (fairyOriginId, designer, name, birthTime, appendedLevel) => {
				fairyInfo.fairyOriginId = fairyOriginId;
				fairyInfo.designer = designer;
				fairyInfo.name = name;
				fairyInfo.birthTime = birthTime;
				fairyInfo.appendedLevel = appendedLevel;
				done();
			});
		},
		
		(done) => {
			EtherFairy.EtherFairyContract.getFairyBasicPointsPerLevel(fairyId, (hpPointPerLevel, attackPointPerLevel, defencePointPerLevel, agilityPointPerLevel, dexterityPointPerLevel) => {
				fairyInfo.hpPointPerLevel = hpPointPerLevel;
				fairyInfo.attackPointPerLevel = attackPointPerLevel;
				fairyInfo.defencePointPerLevel = defencePointPerLevel;
				fairyInfo.agilityPointPerLevel = agilityPointPerLevel;
				fairyInfo.dexterityPointPerLevel = dexterityPointPerLevel;
				done();
			});
		},
		
		(done) => {
			
			EtherFairy.EtherFairyContract.getFairyElementPointsPerLevel(fairyId, (firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel) => {
				fairyInfo.firePointPerLevel = firePointPerLevel;
				fairyInfo.waterPointPerLevel = waterPointPerLevel;
				fairyInfo.windPointPerLevel = windPointPerLevel;
				fairyInfo.earthPointPerLevel = earthPointPerLevel;
				fairyInfo.lightPointPerLevel = lightPointPerLevel;
				fairyInfo.darkPointPerLevel = darkPointPerLevel;
				done();
			});
		},
		
		() => {
			
			let exp = EtherFairy.CalculateManager.calculateEXP(fairyInfo.birthTime);
			let level = EtherFairy.CalculateManager.calculateLevel(exp) + fairyInfo.appendedLevel;
			
			NEXT([
			(next) => {
				
				EtherFairy.FairyOriginModel.get(fairyInfo.fairyOriginId, {
					notExists : () => {
						self.empty();
						next();
					},
					success : (fairyOriginData) => {
						self.empty();
						next(fairyOriginData);
					}
				});	
			},
			
			() => {
				return (fairyOriginData) => {
					
					let birthCal = CALENDAR(new Date(fairyInfo.birthTime * 1000));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 10,
							top : 43,
							width : 339,
							height : 399,
							borderRadius : 6,
							backgroundImage : fairyOriginData === undefined ? EtherFairy.R('notfound.png') : EtherFairy.RF(fairyOriginData.imageFileId),
							backgroundSize : 'cover',
							backgroundPosition : 'center center'
						}
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 0,
							top : 10,
							width : 360,
							textAlign : 'center',
							color : '#fff5ef',
							textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
							fontSize : 20
						},
						c : fairyInfo.name
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 0,
							bottom : 8,
							width : 360,
							textAlign : 'center',
							color : '#fff5ef',
							textShadow : EtherFairy.TextBorderShadow('#1d0e08')
						},
						c : '[' + (fairyOriginData === undefined ? MSG('FAIRY_ORIGIN_NOT_FOUND') : fairyOriginData.name) + ']'
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 10,
							bottom : 135,
							color : '#fff5ef',
							textShadow : EtherFairy.TextBorderShadow('#1d0e08')
						},
						c : 'Lv. ' + level
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							right : 10,
							bottom : 135,
							color : '#fff5ef',
							textShadow : EtherFairy.TextBorderShadow('#1d0e08')
						},
						c : 'HP. ' + EtherFairy.CalculateManager.calculateHP(fairyInfo.hpPointPerLevel * level)
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 10,
							bottom : 98,
							width : 170,
							color : '#66400a',
							textShadow : EtherFairy.TextBorderShadow('#fff'),
							textAlign : 'center',
							fontWeight : 'bold'
						},
						c : fairyInfo.attackPointPerLevel * level
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							right : 10,
							bottom : 98,
							width : 170,
							color : '#66400a',
							textShadow : EtherFairy.TextBorderShadow('#fff'),
							textAlign : 'center',
							fontWeight : 'bold'
						},
						c : fairyInfo.defencePointPerLevel * level
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							left : 10,
							bottom : 50,
							width : 170,
							color : '#66400a',
							textShadow : EtherFairy.TextBorderShadow('#fff'),
							textAlign : 'center',
							fontWeight : 'bold'
						},
						c : fairyInfo.agilityPointPerLevel * level
					}));
					
					self.append(DIV({
						style : {
							position : 'absolute',
							right : 10,
							bottom : 50,
							width : 170,
							color : '#66400a',
							textShadow : EtherFairy.TextBorderShadow('#fff'),
							textAlign : 'center',
							fontWeight : 'bold'
						},
						c : fairyInfo.dexterityPointPerLevel * level
					}));
					
					let dy = 5;
					
					if (fairyInfo.firePointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/fire.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.firePointPerLevel * level
						}));
						
						dy += 53;
					}
					
					if (fairyInfo.waterPointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/water.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.waterPointPerLevel * level
						}));
						
						dy += 53;
					}
					
					if (fairyInfo.windPointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/wind.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.windPointPerLevel * level
						}));
						
						dy += 53;
					}
					
					if (fairyInfo.earthPointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/earth.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.earthPointPerLevel * level
						}));
						
						dy += 53;
					}
					
					if (fairyInfo.lightPointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/light.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.lightPointPerLevel * level
						}));
						
						dy += 53;
					}
					
					if (fairyInfo.darkPointPerLevel > 0) {
						
						self.append(UUI.V_CENTER({
							style : {
								position : 'absolute',
								right : 5,
								top : dy,
								width : 52,
								height : 52,
								backgroundImage : EtherFairy.R('element/dark.png'),
								color : '#fff5ef',
								textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
								textAlign : 'center',
								fontSize : 20
							},
							c : fairyInfo.darkPointPerLevel * level
						}));
						
						dy += 53;
					}
					
					// 레이팅 정보
					EtherFairy.FairyModel.get(fairyId, (fairyData) => {
						
						let markLevel = INTEGER(fairyData.rating / 300) + 1;
						if (markLevel > 6) {
							markLevel = 6;
						}
						
						let markGrade = INTEGER(fairyData.rating % 300 / 100) + 1;
						
						// 랭킹 확인
						EtherFairy.FairyModel.count({
							filter : {
								rating : {
									$gt : fairyData.rating
								}
							}
						}, (count) => {
							
							// 랭킹 1등
							if (count === 0) {
								markLevel = 10;
							}
							
							// 랭킹 10등
							else if (count < 10) {
								markLevel = 9;
							}
							
							// 랭킹 100등
							else if (count < 100) {
								markLevel = 8;
							}
							
							// 랭킹 1000등
							else if (count < 1000) {
								markLevel = 7;
							}
							
							self.append(UUI.V_CENTER({
								style : {
									position : 'absolute',
									left : '50%',
									bottom : 130,
									marginLeft : -33,
									width : 66,
									height : 66,
									backgroundImage : EtherFairy.R('rank/' + markLevel + '.png'),
									textAlign : 'center',
								},
								c : markLevel > 6 ? '' : IMG({
									style : {
										marginTop : 5
									},
									src : EtherFairy.R('rank/' + RUN(() => {
										let markGradeStr = '';
										REPEAT(markGrade, () => {
											markGradeStr += 'i';
										});
										return markGradeStr;
									}) + '.png')
								})
							}));
						});
					});
				};
			}]);
		}]);
	}
});
