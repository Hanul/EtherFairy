EtherFairy.FairyCard = CLASS({
	
	preset : () => {
		return DIV;
	},
	
	params : () => {
		return {
			style : {
				position : 'relative',
				width : 360,
				height : 600,
				backgroundImage : EtherFairy.R('card.png'),
				boxShadow : '0 0 8px rgba(0, 0, 0, 0.8)'
			}
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.fairyId
		
		let fairyId = params.fairyId;
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
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
		
		let addFairyInfoToCard = (fairyInfo) => {
			
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
				};
			}]);
		};
		
		// 지갑을 사용할 때는 스마트 계약을 사용합니다.
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			let fairyInfo = {};
			PARALLEL([
			(done) => {
				EtherFairy.EtherFairyContractController.getFairyBasicInfo(fairyId, (basicInfo) => {
					fairyInfo.fairyOriginId = basicInfo[0];
					fairyInfo.designer = basicInfo[1];
					fairyInfo.name = basicInfo[2];
					fairyInfo.birthTime = basicInfo[3];
					fairyInfo.appendedLevel = basicInfo[4];
					done();
				});
			},
			
			(done) => {
				EtherFairy.EtherFairyContractController.getFairyBasicPointsPerLevel(fairyId, (pointsPerLevel) => {
					fairyInfo.hpPointPerLevel = pointsPerLevel[0];
					fairyInfo.attackPointPerLevel = pointsPerLevel[1];
					fairyInfo.defencePointPerLevel = pointsPerLevel[2];
					fairyInfo.agilityPointPerLevel = pointsPerLevel[3];
					fairyInfo.dexterityPointPerLevel = pointsPerLevel[4];
					done();
				});
			},
			
			(done) => {
				
				EtherFairy.EtherFairyContractController.getFairyElementPointsPerLevel(fairyId, (pointsPerLevel) => {
					fairyInfo.firePointPerLevel = pointsPerLevel[0];
					fairyInfo.waterPointPerLevel = pointsPerLevel[1];
					fairyInfo.windPointPerLevel = pointsPerLevel[2];
					fairyInfo.earthPointPerLevel = pointsPerLevel[3];
					fairyInfo.lightPointPerLevel = pointsPerLevel[4];
					fairyInfo.darkPointPerLevel = pointsPerLevel[5];
					done();
				});
			},
			
			() => {
				addFairyInfoToCard(fairyInfo);
			}]);
		}
		
		// 지갑을 사용할 수 없을때는 서버에서 가져옵니다.
		else {
			
			let fairyInfo = {};
			PARALLEL([
			(done) => {
				etherFairyContractRoom.send({
					methodName : 'getFairyBasicInfo',
					data : fairyId
				}, (basicInfo) => {
					fairyInfo.fairyOriginId = basicInfo[0];
					fairyInfo.designer = basicInfo[1];
					fairyInfo.name = basicInfo[2];
					fairyInfo.birthTime = basicInfo[3];
					fairyInfo.appendedLevel = basicInfo[4];
					done();
				});
			},
			
			(done) => {
				etherFairyContractRoom.send({
					methodName : 'getFairyBasicPointsPerLevel',
					data : fairyId
				}, (pointsPerLevel) => {
					fairyInfo.hpPointPerLevel = pointsPerLevel[0];
					fairyInfo.attackPointPerLevel = pointsPerLevel[1];
					fairyInfo.defencePointPerLevel = pointsPerLevel[2];
					fairyInfo.agilityPointPerLevel = pointsPerLevel[3];
					fairyInfo.dexterityPointPerLevel = pointsPerLevel[4];
					done();
				});
			},
			
			(done) => {
				
				etherFairyContractRoom.send({
					methodName : 'getFairyElementPointsPerLevel',
					data : fairyId
				}, (pointsPerLevel) => {
					fairyInfo.firePointPerLevel = pointsPerLevel[0];
					fairyInfo.waterPointPerLevel = pointsPerLevel[1];
					fairyInfo.windPointPerLevel = pointsPerLevel[2];
					fairyInfo.earthPointPerLevel = pointsPerLevel[3];
					fairyInfo.lightPointPerLevel = pointsPerLevel[4];
					fairyInfo.darkPointPerLevel = pointsPerLevel[5];
					done();
				});
			},
			
			() => {
				addFairyInfoToCard(fairyInfo);
			}]);
		}
		
		self.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
