EtherFairy.Fairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyId = INTEGER(params.fairyId);
			
			let namePanel;
			let menu;
			let battleHistory;
			let bottom;
			EtherFairy.Layout.setContent(DIV({
				style : {
					padding : '50px 0'
				},
				c : [
				
				DIV({
					style : {
						position : 'relative',
						margin : 'auto',
						width : 882,
						height : 684,
						backgroundImage : EtherFairy.R('fairyinfo/background.png')
					},
					c : [
					namePanel = H1({
						style : {
							paddingTop : 13,
							fontSize : 28,
							fontWeight : 'bold',
							color : '#ffde5c',
							textShadow : EtherFairy.TextBorderShadow('#160b00'),
							textAlign : 'center'
						}
					}),
					
					EtherFairy.FairyCard({
						style : {
							position : 'absolute',
							left : 50,
							top : 70
						},
						fairyId : fairyId
					}),
					
					menu = DIV({
						style : {
							position : 'absolute',
							width : 390,
							paddingRight : 20,
							right : 27,
							top : 70
						}
					})]
				}),
				
				battleHistory = DIV({
					style : {
						margin : 'auto',
						width : 882
					}
				}),
				
				// bottom
				DIV({
					style : {
						margin : 'auto',
						width : 882
					},
					c : bottom = DIV({
						style : {
							marginLeft : 2.4,
							width : 876,
							height : 95,
							backgroundImage : EtherFairy.R('fairyinfo/bottom.png')
						}
					})
				})]
			}));
			
			let createInfoPanel = () => {
				console.log('test');
			};
			
			// 지갑을 사용할 때는 스마트 계약을 사용한다.
			if (EtherFairy.WalletManager.checkIsEnable() === true) {
				
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
					namePanel.append(fairyInfo.name);
					
					EtherFairy.EtherFairyContract.tokenURI(fairyId, (tokenURI) => {
						console.log(tokenURI);
					});
					
					// 판매중인지 확인하고 판매자면 판매 취소가 가능하도록 합니다.
					EtherFairy.FairyMarketContract.checkFairyForSale(fairyId, (forSale) => {
						if (forSale === true) {
							
							EtherFairy.FairyMarketContract.findSaleIdByFairyId(fairyId, (saleId) => {
								EtherFairy.FairyMarketContract.getSaleInfo(saleId, (seller, fairyId, price) => {
									
									EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
										
										if (walletAddress === seller) {
											
											menu.append(DIV({
												c : A({
													c : MSG('CANCEL_TRADE'),
													on : {
														tap : () => {
															
															Yogurt.Confirm({
																msg : MSG('REALLY_CANCEL_PROMPT')
															}, () => {
																
																EtherFairy.FairyMarketContract.cancelSale(fairyId, () => {
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
																
																EtherFairy.FairyMarketContract.buy({
																	fairyId : fairyId,
																	ether : price
																}, () => {
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
							});
						}
					});
					
					// 만약 소유주면 소유주 메뉴를 추가합니다.
					EtherFairy.EtherFairyContract.ownerOf(fairyId, (ownerAddress) => {
						
						EtherFairy.WalletManager.getWalletAddress((walletAddress) => {
							
							if (walletAddress === ownerAddress) {
								
								menu.append(UUI.V_CENTER({
									style : {
										position : 'absolute',
										top : -58,
										right : 0,
										width : 113,
										height : 34,
										textShadow : EtherFairy.TextBorderShadow('#160b00'),
										backgroundImage : EtherFairy.R('fairyinfo/changename.png'),
										textAlign : 'center',
										cursor : 'pointer'
									},
									c : MSG('CHANGE_NAME'),
									on : {
										tap : () => {
											
											Yogurt.Prompt(MSG('CHANGE_NAME_PROMPT'), (newName) => {
												
												EtherFairy.EtherFairyContract.changeFairyName({
													fairyId : fairyId,
													newName : newName
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											});
										}
									}
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('CUSTOM_LEVEL_UP')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.levelUpFairy({
													fairyId : fairyId,
													ether : 0.01
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.appendedLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('HP_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseHPPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.hpPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.hpPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('ATTACK_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseAttackPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.attackPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.attackPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('DEFENCE_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseDefencePointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.defencePointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.defencePointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('AGILITY_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseAgilityPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.agilityPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.agilityPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('DEXTERITY_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseDexterityPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.dexterityPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.dexterityPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('FIRE_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseFirePointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.firePointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.firePointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('WATER_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseWaterPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.waterPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.waterPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('WIND_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseWindPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.windPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.windPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('EARTH_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseEarthPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.earthPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.earthPointPerLevel
									}), CLEAR_BOTH()]
								}));
								
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('LIGHT_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseLightPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.lightPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.lightPointPerLevel
									}), CLEAR_BOTH()]
								}));
								menu.append(DIV({
									style : {
										marginTop : 14
									},
									c : [P({
										style : {
											flt : 'left',
											marginTop : 6,
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : MSG('DARK_POINT_PER_LEVEL')
									}), UUI.BUTTON_H({
										style : {
											flt : 'right',
											color : '#fff5cb',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										icon : IMG({
											src : EtherFairy.R('fairyinfo/plus.png')
										}),
										spacing : 20,
										title : '[0.01 Ether]',
										on : {
											tap : () => {
												EtherFairy.EtherFairyContract.increaseDarkPointPerLevel({
													fairyId : fairyId,
													ether : 0.01 * fairyInfo.darkPointPerLevel
												}, () => {
													EtherFairy.REFRESH('fairy/' + fairyId);
												});
											}
										}
									}), P({
										style : {
											flt : 'right',
											marginRight : 15,
											marginTop : 6,
											color : '#ffde5c',
											textShadow : EtherFairy.TextBorderShadow('#160b00')
										},
										c : fairyInfo.darkPointPerLevel
									}), CLEAR_BOTH()]
								}));
							}
							
							else {
								createInfoPanel();
							}
						});
					});
				}]);
			}
			
			else {
				createInfoPanel();
			}
			
			let start = 0;
			let count = 10;
			
			let loadBattleResult = () => {
				
				// 전투 기록을 가져옵니다.
				EtherFairy.BattleResultModel.find({
					filter : {
						$or : [{
							fairyId : fairyId
						}, {
							enemyId : fairyId
						}]
					},
					start : start,
					count : count
				}, (battleResults) => {
					
					battleHistory.empty();
					
					EACH(battleResults, (battleResult) => {
						
						let isWin = (battleResult.fairyId === fairyId && battleResult.isWin === true) || (battleResult.fairyId !== fairyId && battleResult.isWin !== true) ;
						let ratingChange = battleResult.fairyId === fairyId ? battleResult.fairyRatingChange : battleResult.enemyRatingChange;
						
						let battleResultPanel;
						let fairyPanel;
						let opponentPanel;
						battleHistory.append(battleResultPanel = DIV({
							style : {
								marginLeft : 2.4,
								color : '#000',
								width : 876,
								height : 211,
								backgroundImage : EtherFairy.R(isWin === true ? 'fairyinfo/winpanel.png' : 'fairyinfo/losepanel.png')
							},
							c : [fairyPanel = DIV({
								style : {
									width : '40%',
									flt : 'left'
								}
							}), UUI.V_CENTER({
								style : {
									position : 'absolute',
									left : '50%',
									marginLeft : -58,
									width : 116,
									height : 211,
									textAlign : 'center'
								},
								c : [IMG({
									src : EtherFairy.R(isWin === true ? 'fairyinfo/win.png' : 'fairyinfo/lose.png')
								}), IMG({
									style : {
										marginTop : 20
									},
									src : EtherFairy.R('fairyinfo/sword.png'),
									transform : battleResult.fairyId === fairyId ? undefined : 'scaleX(-1)'
								}), DIV({
									style : {
										marginTop : 20,
										color : ratingChange >= 0 ? '#00FFFF' : '#FF0000',
										textShadow : EtherFairy.TextBorderShadow('#160b00')
									},
									c : ratingChange >= 0 ? '+' + ratingChange : ratingChange
								})]
							}), opponentPanel = DIV({
								style : {
									width : '40%',
									flt : 'right'
								}
							}), CLEAR_BOTH()]
						}));
						
						// 현재 요정 정보
						EtherFairy.FairyModel.get(fairyId, (fairyData) => {
							
							fairyPanel.append(UUI.V_CENTER({
								style : {
									marginLeft : 120,
									flt : 'left',
									width : 280,
									height : 211,
									position : 'relative',
									fontWeight : 'bold',
									textShadow : EtherFairy.TextBorderShadow('#160b00')
								},
								c : [DIV({
									style : {
										flt : 'left'
									},
									c : EtherFairy.RankMark(fairyData.rating)
								}), DIV({
									style : {
										marginTop : 5,
										marginLeft : 20,
										flt : 'left',
										color : '#fff5cb'
									},
									c : [A({
										style : {
											fontSize : 25,
											color : '#fff'
										},
										c : fairyData.name,
										on : {
											tap : () => {
												EtherFairy.GO('fairy/' + fairyData.id);
											}
										}
									}), DIV({
										c : fairyData.rating
									})]
								}), CLEAR_BOTH(), DIV({
									style : {
										marginTop : 15,
										marginLeft : 30,
										width : 80,
										flt : 'left',
										color : '#ffde5c'
									},
									c : 'Lv.'
								}), DIV({
									style : {
										marginTop : 15,
										flt : 'left',
										color : '#fff5cb'
									},
									c : (battleResult.fairyId === fairyId ? battleResult.fairyLevel : battleResult.enemyLevel)
								}), CLEAR_BOTH(), DIV({
									style : {
										marginTop : 10,
										marginLeft : 30,
										width : 80,
										flt : 'left',
										color : '#ffde5c'
									},
									c : 'HP'
								}), DIV({
									style : {
										marginTop : 10,
										flt : 'left',
										color : '#fff5cb'
									},
									c : (battleResult.fairyId === fairyId ? battleResult.fairyHP : battleResult.enemyHP)
								}), CLEAR_BOTH(), DIV({
									style : {
										marginTop : 10,
										marginLeft : 30,
										width : 80,
										flt : 'left',
										color : '#ffde5c'
									},
									c : MSG('DAMAGE')
								}), DIV({
									style : {
										marginTop : 10,
										flt : 'left',
										color : '#fff5cb'
									},
									c : INTEGER(battleResult.fairyId === fairyId ? battleResult.fairyDamage : battleResult.enemyDamage)
								})]
							}));;
							
							// 상대 정보
							EtherFairy.FairyModel.get(battleResult.fairyId !== fairyId ? battleResult.fairyId : battleResult.enemyId, (opponentData) => {
								
								opponentPanel.append(UUI.V_CENTER({
									style : {
										flt : 'right',
										width : 280,
										height : 211,
										position : 'relative',
										fontWeight : 'bold',
										textShadow : EtherFairy.TextBorderShadow('#160b00')
									},
									c : [DIV({
										style : {
											flt : 'left'
										},
										c : EtherFairy.RankMark(fairyData.rating)
									}), DIV({
										style : {
											marginTop : 5,
											marginLeft : 20,
											flt : 'left',
											color : '#fff5cb'
										},
										c : [A({
											style : {
												fontSize : 25,
												color : '#fff'
											},
											c : opponentData.name,
											on : {
												tap : () => {
													EtherFairy.GO('fairy/' + opponentData.id);
												}
											}
										}), DIV({
											c : opponentData.rating
										})]
									}), CLEAR_BOTH(), DIV({
										style : {
											marginTop : 15,
											marginLeft : 30,
											width : 80,
											flt : 'left',
											color : '#ffde5c'
										},
										c : 'Lv.'
									}), DIV({
										style : {
											marginTop : 15,
											flt : 'left',
											color : '#fff5cb'
										},
										c : (battleResult.fairyId !== fairyId ? battleResult.fairyLevel : battleResult.enemyLevel)
									}), CLEAR_BOTH(), DIV({
										style : {
											marginTop : 10,
											marginLeft : 30,
											width : 80,
											flt : 'left',
											color : '#ffde5c'
										},
										c : 'HP'
									}), DIV({
										style : {
											marginTop : 10,
											flt : 'left',
											color : '#fff5cb'
										},
										c : (battleResult.fairyId !== fairyId ? battleResult.fairyHP : battleResult.enemyHP)
									}), CLEAR_BOTH(), DIV({
										style : {
											marginTop : 10,
											marginLeft : 30,
											width : 80,
											flt : 'left',
											color : '#ffde5c'
										},
										c : MSG('DAMAGE')
									}), DIV({
										style : {
											marginTop : 10,
											flt : 'left',
											color : '#fff5cb'
										},
										c : INTEGER(battleResult.fairyId !== fairyId ? battleResult.fairyDamage : battleResult.enemyDamage)
									}), CLEAR_BOTH()]
								}));
								
								opponentPanel.append(CLEAR_BOTH());
							});
						});
					});
				});
			};
			
			loadBattleResult();
			
			bottom.append(UUI.BUTTON_H({
				style : {
					marginTop : 10,
					marginLeft : 40,
					flt : 'left',
					textShadow : EtherFairy.TextBorderShadow('#160b00')
				},
				icon : IMG({
					src : EtherFairy.R('fairyinfo/arrow.png')
				}),
				spacing : 10,
				title : MSG('BEFORE_BUTTON'),
				on : {
					tap : () => {
						start -= count;
						if (start < 0) {
							start = 0;
						}
						loadBattleResult();
					}
				}
			}));
			
			bottom.append(UUI.BUTTON_H({
				style : {
					marginTop : 10,
					marginRight : 40,
					flt : 'right',
					textShadow : EtherFairy.TextBorderShadow('#160b00')
				},
				icon : IMG({
					style : {
						transform : 'scaleX(-1)'
					},
					src : EtherFairy.R('fairyinfo/arrow.png')
				}),
				isIconRight : true,
				spacing : 10,
				title : MSG('FORWARD_BUTTON'),
				on : {
					tap : () => {
						start += count;
						loadBattleResult();
					}
				}
			}));
			
			bottom.append(CLEAR_BOTH());
		});
	}
});
