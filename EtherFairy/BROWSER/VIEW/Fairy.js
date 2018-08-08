EtherFairy.Fairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		inner.on('paramsChange', (params) => {
			
			let fairyId = params.fairyId;
			
			let fairyPanel;
			let menu;
			EtherFairy.Layout.setContent(DIV({
				style : {
					padding : 10
				},
				c : [
				fairyPanel = DIV({
					style : {
						flt : 'left',
						width : 300,
						backgroundColor : '#fff',
						borderRadius : 6,
						boxShadow : '0 0 5px rgba(0,0,0,0.5)'
					},
					c : IMG({
						src : EtherFairy.R('loadingwhite.gif')
					})
				}),
				
				menu = DIV({
					style : {
						marginLeft : 10,
						flt : 'left'
					}
				}),
				
				CLEAR_BOTH()]
			}));
			
			let addFairyInfoToPanel = (fairyId, fairyInfo) => {
				
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
				});
			};
			
			// 지갑을 사용할 때는 스마트 계약을 사용한다.
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
					addFairyInfoToPanel(fairyId, fairyInfo);
				}]);
				
				EtherFairy.EtherFairyContractController.tokenURI(fairyId, (tokenURI) => {
					console.log(tokenURI);
				});
				
				// 판매중인지 확인하고 판매자면 판매 취소가 가능하도록 합니다.
				EtherFairy.FairyMarketContractController.checkFairyForSale(fairyId, (forSale) => {
					if (forSale === true) {
						
						EtherFairy.FairyMarketContractController.findSaleIdByFairyId(fairyId, (saleId) => {
							EtherFairy.FairyMarketContractController.getSaleInfo(saleId, (saleInfo) => {
								
								let seller = saleInfo[0];
								let fairyId = saleInfo[1];
								let price = saleInfo[2];
								
								if (EtherFairy.WalletManager.getWalletAddress() === seller) {
									
									menu.append(DIV({
										c : A({
											c : MSG('CANCEL_TRADE'),
											on : {
												tap : () => {
													
													Yogurt.Confirm({
														msg : MSG('REALLY_CANCEL_PROMPT')
													}, () => {
														
														EtherFairy.FairyMarketContractController.cancelSale(fairyId, () => {
															EtherFairy.REFRESH('fairy/' + fairyId);
														});
													});
												}
											}
										})
									}));
								}
								
								else {
									
									menu.append(DIV({
										c : A({
											c : MSG('BUY_TRADE_FAIRY'),
											on : {
												tap : () => {
													
													Yogurt.Confirm({
														msg : MSG('REALLY_BUY_TRADE_FAIRY_PROMPT')
													}, () => {
														
														EtherFairy.FairyMarketContractController.buy(fairyId, price, () => {
															EtherFairy.REFRESH('fairy/' + fairyId);
														});
													});
												}
											}
										})
									}));
								}
							});
						});
					}
				});
				
				// 만약 소유주면 소유주 메뉴를 추가합니다.
				EtherFairy.EtherFairyContractController.ownerOf(fairyId, (ownerAddress) => {
					
					if (EtherFairy.WalletManager.getWalletAddress() === ownerAddress) {
						
						menu.append(DIV({
							c : A({
								c : MSG('CHANGE_NAME'),
								on : {
									tap : () => {
										
										Yogurt.Prompt(MSG('CHANGE_NAME_PROMPT'), (newName) => {
											
											EtherFairy.EtherFairyContractController.changeFairyName(fairyId, newName, () => {
												EtherFairy.REFRESH('fairy/' + fairyId);
											});
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('CUSTOM_LEVEL_UP') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.levelUpFairy(fairyId, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_HP_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseHPPointPerLevel(fairyId, fairyInfo.hpPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_ATTACK_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseAttackPointPerLevel(fairyId, fairyInfo.attackPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_DEFENSE_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseDefensePointPerLevel(fairyId, fairyInfo.defensePointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_AGILITY_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseAgilityPointPerLevel(fairyId, fairyInfo.agilityPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_DEXTERITY_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseDexterityPointPerLevel(fairyId, fairyInfo.dexterityPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_FIRE_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseFirePointPerLevel(fairyId, fairyInfo.firePointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_WATER_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseWaterPointPerLevel(fairyId, fairyInfo.waterPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_WIND_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseWindPointPerLevel(fairyId, fairyInfo.windPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_EARTH_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseEarthPointPerLevel(fairyId, fairyInfo.earthPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_LIGHT_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseLightPointPerLevel(fairyId, fairyInfo.lightPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
						
						menu.append(DIV({
							c : A({
								c : MSG('INCREASE_DARK_POINT_PER_LEVEL') + ' (0.01 Ether)',
								on : {
									tap : () => {
										EtherFairy.EtherFairyContractController.increaseDarkPointPerLevel(fairyId, fairyInfo.darkPointPerLevel, () => {
											EtherFairy.REFRESH('fairy/' + fairyId);
										});
									}
								}
							})
						}));
					}
				});
			}
			
			// 지갑을 사용할 수 없을때는 서버에서 가져온다.
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
					addFairyInfoToPanel(fairyId, fairyInfo);
				}]);
			}
		});
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
