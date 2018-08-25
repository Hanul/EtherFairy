EtherFairy.Fairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		inner.on('paramsChange', (params) => {
			
			let fairyId = params.fairyId;
			
			let menu;
			EtherFairy.Layout.setContent(DIV({
				style : {
					padding : 10
				},
				c : [
				EtherFairy.FairyCard({
					style : {
						flt : 'left'
					},
					fairyId : fairyId
				}),
				
				menu = DIV({
					style : {
						marginLeft : 10,
						flt : 'left'
					}
				}),
				
				CLEAR_BOTH()]
			}));
			
			// 지갑을 사용할 때는 스마트 계약을 사용한다.
			if (EtherFairy.WalletManager.checkIsEnable() === true) {
				
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
									c : MSG('INCREASE_DEFENCE_POINT_PER_LEVEL') + ' (0.01 Ether)',
									on : {
										tap : () => {
											EtherFairy.EtherFairyContractController.increaseDefencePointPerLevel(fairyId, fairyInfo.defencePointPerLevel, () => {
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
				});
			}
		});
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
