EtherFairy.FairyCard = CLASS({
	
	preset : () => {
		return DIV;
	},
	
	params : () => {
		return {
			style : {
				width : 300,
				backgroundColor : '#fff',
				borderRadius : 6,
				boxShadow : '0 0 8px rgba(0, 0, 0, 0.8)'
			}
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.fairyId
		
		let fairyId = params.fairyId;
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		self.append(DIV({
			style : {
				textAlign : 'center',
				padding : 30
			},
			c : IMG({
				src : EtherFairy.R('loadingwhite.gif')
			})
		}));
		
		let addFairyInfoToCard = (fairyInfo) => {
			
			EtherFairy.FairyOriginModel.get(fairyInfo.fairyOriginId, (fairyOriginData) => {
				self.empty();
				
				let birthCal = CALENDAR(new Date(fairyInfo.birthTime * 1000));
				
				self.append(DIV({
					style : {
						position : 'relative',
						height : 400,
						borderRadius : '6px 6px 0 0',
						backgroundImage : EtherFairy.RF(fairyOriginData.imageFileId),
						backgroundSize : 'cover',
						backgroundPosition : 'center center'
					},
					c : DIV({
						style : {
							position : 'absolute',
							left : 10,
							bottom : 10,
							width : 280
						},
						c : [DIV({
							style : {
								flt : 'left',
								backgroundColor : 'rgba(0, 0, 0, 0.5)',
								padding : '3px 6px',
								borderRadius : 3
							},
							c : fairyOriginData.name
						}), CLEAR_BOTH(), DIV({
							style : {
								marginTop : 5,
								flt : 'left',
								backgroundColor : 'rgba(0, 0, 0, 0.5)',
								padding : '5px 10px',
								borderRadius : 3,
								fontSize : 20
							},
							c : fairyInfo.name
						}), DIV({
							style : {
								marginTop : 20,
								flt : 'right',
								backgroundColor : 'rgba(0, 0, 0, 0.5)',
								padding : '3px 6px',
								borderRadius : 3,
								fontSize : 12
							},
							c : [SPAN({
								style : {
									color : '#FF9900'
								},
								c : FontAwesome.GetIcon('birthday-cake')
							}), ' ' + birthCal.getYear() + '-' + birthCal.getMonth(true) + '-' + birthCal.getDate(true) + ' ' + birthCal.getHour(true) + ':' + birthCal.getMinute(true)]
						}), CLEAR_BOTH()]
					})
				}));
				
				self.append(DIV({
					style : {
						backgroundColor : '#111'
					},
					c : [P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : 'Lv : ' + fairyInfo.appendedLevel
					}), P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : 'HP : ' + fairyInfo.hpPointPerLevel
					}), P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : '공격 : ' + fairyInfo.attackPointPerLevel
					}), P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : '방어 : ' + fairyInfo.defensePointPerLevel
					}), P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : '민첩 : ' + fairyInfo.agilityPointPerLevel
					}), P({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						c : '재치 : ' + fairyInfo.dexterityPointPerLevel
					}), CLEAR_BOTH()]
				}));
				
				self.append(DIV({
					style : {
						backgroundColor : '#222'
					},
					c : [UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('fire.png')
						}),
						spacing : 10,
						title : fairyInfo.firePointPerLevel
					}), UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('water.png')
						}),
						spacing : 10,
						title : fairyInfo.waterPointPerLevel
					}), UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('wind.png')
						}),
						spacing : 10,
						title : fairyInfo.windPointPerLevel
					}), UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('earth.png')
						}),
						spacing : 10,
						title : fairyInfo.earthPointPerLevel
					}), UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('light.png')
						}),
						spacing : 10,
						title : fairyInfo.lightPointPerLevel
					}), UUI.BUTTON_H({
						style : {
							width : 140,
							padding : 5,
							flt : 'left'
						},
						icon : IMG({
							src : EtherFairy.R('dark.png')
						}),
						spacing : 10,
						title : fairyInfo.darkPointPerLevel
					}), CLEAR_BOTH()]
				}));
			});
		};
		
		// 지갑을 사용할 때는 스마트 계약을 사용합니다.
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			let fairyInfo = {};
			PARALLEL([
			(done) => {
				EtherFairy.EtherFairyContractController.getFairyBasicInfo(fairyId, (basicInfo) => {
					fairyInfo.fairyOriginId = basicInfo[0];
					fairyInfo.name = basicInfo[1];
					fairyInfo.birthTime = basicInfo[2];
					fairyInfo.appendedLevel = basicInfo[3];
					done();
				});
			},
			
			(done) => {
				EtherFairy.EtherFairyContractController.getFairyBasicPointsPerLevel(fairyId, (pointsPerLevel) => {
					fairyInfo.hpPointPerLevel = pointsPerLevel[0];
					fairyInfo.attackPointPerLevel = pointsPerLevel[1];
					fairyInfo.defensePointPerLevel = pointsPerLevel[2];
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
					fairyInfo.name = basicInfo[1];
					fairyInfo.birthTime = basicInfo[2];
					fairyInfo.appendedLevel = basicInfo[3];
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
					fairyInfo.defensePointPerLevel = pointsPerLevel[2];
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
