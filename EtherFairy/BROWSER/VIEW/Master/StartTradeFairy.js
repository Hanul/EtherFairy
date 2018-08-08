EtherFairy('Master').StartTradeFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			P({
				c : MSG('SELECT_TO_TRADE_FAIRY')
			}),
			
			fairyList = DIV({
				style : {
					margin : 'auto',
					width : 930,
					paddingLeft : 10
				},
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.gif')
				})
			})]
		}));
		
		let createFairyPanel = () => {
			return DIV({
				style : {
					flt : 'left',
					marginTop : 10,
					marginRight : 10,
					width : 300,
					backgroundColor : '#fff',
					borderRadius : 6,
					boxShadow : '0 0 5px rgba(0,0,0,0.5)',
					cursor : 'pointer'
				},
				c : IMG({
					src : EtherFairy.R('loadingwhite.gif')
				})
			}).appendTo(fairyList);
		};
		
		let addFairyInfoToPanel = (fairyPanel, fairyId, fairyInfo) => {
			
			EtherFairy.FairyOriginModel.get(fairyInfo.fairyOriginId, (fairyOriginData) => {
				fairyPanel.empty();
				
				fairyPanel.append(DIV({
					style : {
						height : 400,
						borderRadius : '6px 6px 0 0',
						backgroundImage : EtherFairy.RF(fairyOriginData.imageFileId),
						backgroundSize : 'cover',
						backgroundRepeat : 'no-repeat',
						backgroundPosition : 'center center'
					}
				}));
				
				fairyPanel.append(DIV({
					style : {
						backgroundColor : '#222'
					},
					c : [P({
						c : MSG('FAIRY_ORIGIN_NAME') + ' : ' + fairyOriginData.name
					}), P({
						c : MSG('FAIRY_NAME') + ' : ' + fairyInfo.name
					}), P({
						c : MSG('BIRTHDAY') + ' : ' + fairyInfo.birthTime
					}), P({
						c : MSG('APPENDED_LEVEL') + ' : ' + fairyInfo.appendedLevel
					}), P({
						c : MSG('HP_POINT_PER_LEVEL') + ' : ' + fairyInfo.hpPointPerLevel
					}), P({
						c : MSG('ATTACK_POINT_PER_LEVEL') + ' : ' + fairyInfo.attackPointPerLevel
					}), P({
						c : MSG('DEFENSE_POINT_PER_LEVEL') + ' : ' + fairyInfo.defensePointPerLevel
					}), P({
						c : MSG('AGILITY_POINT_PER_LEVEL') + ' : ' + fairyInfo.agilityPointPerLevel
					}), P({
						c : MSG('DEXTERITY_POINT_PER_LEVEL') + ' : ' + fairyInfo.dexterityPointPerLevel
					}), P({
						c : MSG('FIRE_POINT_PER_LEVEL') + ' : ' + fairyInfo.firePointPerLevel
					}), P({
						c : MSG('WATER_POINT_PER_LEVEL') + ' : ' + fairyInfo.waterPointPerLevel
					}), P({
						c : MSG('WIND_POINT_PER_LEVEL') + ' : ' + fairyInfo.windPointPerLevel
					}), P({
						c : MSG('EARTH_POINT_PER_LEVEL') + ' : ' + fairyInfo.earthPointPerLevel
					}), P({
						c : MSG('LIGHT_POINT_PER_LEVEL') + ' : ' + fairyInfo.lightPointPerLevel
					}), P({
						c : MSG('DARK_POINT_PER_LEVEL') + ' : ' + fairyInfo.darkPointPerLevel
					})]
				}));
				
				fairyPanel.on('tap', () => {
					
					// 가격 입력
					Yogurt.Prompt(MSG('ENTER_FAIRY_PRICE') + ' (Ether)', (price) => {
						
						EtherFairy.FairyMarketContractController.startSale(fairyId, REAL(price), () => {
							EtherFairy.GO('master/tradefairy');
						});
					});
				});
			});
		};
		
		EtherFairy.MasterModel.get(EtherFairy.WalletManager.getWalletAddress(), {
			notExists : () => {
				//TODO:
			},
			success : () => {
				
				EtherFairy.EtherFairyContractController.balanceOf(EtherFairy.WalletManager.getWalletAddress(), (fairyCount) => {
					
					fairyList.empty();
					
					REPEAT(fairyCount, (i) => {
						
						let fairyPanel = createFairyPanel();
						
						EtherFairy.EtherFairyContractController.getFairyId(EtherFairy.WalletManager.getWalletAddress(), i, (fairyId) => {
							
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
								addFairyInfoToPanel(fairyPanel, fairyId, fairyInfo);
							}]);
						});
					});
					
					fairyList.append(CLEAR_BOTH());
				});
			}
		});
	}
});
