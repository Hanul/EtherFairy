EtherFairy.Fairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		inner.on('paramsChange', (params) => {
			
			let fairyId = INTEGER(params.fairyId);
			
			let namePanel;
			let menu;
			let battleHistory;
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
					c : DIV({
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
					namePanel.append(fairyInfo.name);
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
						});
					}
				});
				
				// 만약 소유주면 소유주 메뉴를 추가합니다.
				EtherFairy.EtherFairyContractController.ownerOf(fairyId, (ownerAddress) => {
					
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
											
											EtherFairy.EtherFairyContractController.changeFairyName(fairyId, newName, () => {
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
											EtherFairy.EtherFairyContractController.levelUpFairy(fairyId, () => {
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
											EtherFairy.EtherFairyContractController.increaseHPPointPerLevel(fairyId, fairyInfo.hpPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseAttackPointPerLevel(fairyId, fairyInfo.attackPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseDefencePointPerLevel(fairyId, fairyInfo.defencePointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseAgilityPointPerLevel(fairyId, fairyInfo.agilityPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseDexterityPointPerLevel(fairyId, fairyInfo.dexterityPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseFirePointPerLevel(fairyId, fairyInfo.firePointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseWaterPointPerLevel(fairyId, fairyInfo.waterPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseWindPointPerLevel(fairyId, fairyInfo.windPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseEarthPointPerLevel(fairyId, fairyInfo.earthPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseLightPointPerLevel(fairyId, fairyInfo.lightPointPerLevel, () => {
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
											EtherFairy.EtherFairyContractController.increaseDarkPointPerLevel(fairyId, fairyInfo.darkPointPerLevel, () => {
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
			}
			
			else {
				createInfoPanel();
			}
			
			// 전투 기록을 가져옵니다.
			EtherFairy.BattleResultModel.find({
				filter : {
					$or : [{
						fairyId : fairyId
					}, {
						enemyId : fairyId
					}]
				},
				count : 10
			}, (battleResults) => {
				
				EACH(battleResults, (battleResult) => {
					
					let isWin = (battleResult.fairyId === fairyId && battleResult.isWin === true) || (battleResult.fairyId !== fairyId && battleResult.isWin !== true) ;
					
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
						}), FontAwesome.GetIcon({
							style : {
								position : 'absolute',
								left : '50%',
								marginLeft : -7
							},
							key : battleResult.fairyId === fairyId ? 'arrow-right' : 'arrow-left'
						}), opponentPanel = DIV({
							style : {
								width : '40%',
								flt : 'right'
							}
						}), CLEAR_BOTH()]
					}));
					
					// 현재 요정 정보
					EtherFairy.FairyModel.get(fairyId, (fairyData) => {
						fairyPanel.append(DIV({
							c : isWin === true ? '승리!' : '패배!'
						}));
						fairyPanel.append(DIV({
							c : ['이름: ', A({
								c : fairyData.name,
								on : {
									tap : () => {
										EtherFairy.GO('fairy/' + fairyData.id);
									}
								}
							})]
						}));
						fairyPanel.append(DIV({
							c : '점수: ' + fairyData.rating
						}));
						fairyPanel.append(DIV({
							c : '레벨: ' + (battleResult.fairyId === fairyId ? battleResult.fairyLevel : battleResult.enemyLevel)
						}));
						fairyPanel.append(DIV({
							c : 'HP: ' + (battleResult.fairyId === fairyId ? battleResult.fairyHP : battleResult.enemyHP)
						}));
						fairyPanel.append(DIV({
							c : '데미지: ' + INTEGER(battleResult.fairyId === fairyId ? battleResult.fairyDamage : battleResult.enemyDamage)
						}));
					});
					
					// 상대 정보
					EtherFairy.FairyModel.get(battleResult.fairyId !== fairyId ? battleResult.fairyId : battleResult.enemyId, (opponentData) => {
						opponentPanel.append(DIV({
							c : isWin !== true ? '승리!' : '패배!'
						}));
						opponentPanel.append(DIV({
							c : ['이름: ', A({
								c : opponentData.name,
								on : {
									tap : () => {
										EtherFairy.GO('fairy/' + opponentData.id);
									}
								}
							})]
						}));
						opponentPanel.append(DIV({
							c : '점수: ' + opponentData.rating
						}));
						opponentPanel.append(DIV({
							c : '레벨: ' + (battleResult.fairyId !== fairyId ? battleResult.fairyLevel : battleResult.enemyLevel)
						}));
						opponentPanel.append(DIV({
							c : 'HP: ' + (battleResult.fairyId !== fairyId ? battleResult.fairyHP : battleResult.enemyHP)
						}));
						opponentPanel.append(DIV({
							c : '데미지: ' + INTEGER(battleResult.fairyId !== fairyId ? battleResult.fairyDamage : battleResult.enemyDamage)
						}));
					});
				});
			});
		});
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
