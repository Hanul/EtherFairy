EtherFairy('Company').ManageService = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		TITLE('Ether Fairy 관리자 페이지');
		
		let menu;
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					marginBottom : 20
				},
				c : '서비스 관리 페이지'
			}),
			
			menu = DIV()
			]
		}));
		
		EtherFairy.EtherFairyContractController.getCompanyAddress((companyAddress) => {
			
			if (EtherFairy.WalletManager.getWalletAddress() === companyAddress) {
				
				EtherFairy.EtherFairyContractController.getMasterCount((masterCount) => {
					menu.append('총 소유주 수 : ' + masterCount);
				});
				
				/*EtherFairy.EtherFairyContractController.supportsInterface(0x80ac58cd, (r) => {
					console.log(r);
				});*/
				
				/*menu.append(DIV({
					c : A({
						c : '소유권 이전',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.transferOwnership('0xEcCFaA737a5A80bE37e4E70130628E692413cB36', () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : '서비스 일시정지',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.pauseService(() => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : '서비스 재개',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.resumeService(() => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : '요정 원본 가격 변경',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.changeFairyOriginPrice(0.01, () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : '임의 레벨업 가격 변경',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.changeCustomLevelUpPrice(0.01, () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : '임의로 포인트를 증가시키는데 드는 포인트당 가격 변경',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.changeIncreasePointPricePerPoint(0.01, () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : ' tokenMetadataBaseURI 변경',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.changeTokenMetadataBaseURI('test', () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : ' 특정 소유주 차단',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.blockMaster('0x17a4823037b71aDFE8F5bE1246404B1b14Ae1195', () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : ' 특정 소유주 차단 해제',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.unblockMaster('0x17a4823037b71aDFE8F5bE1246404B1b14Ae1195', () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : ' 특정 요정 차단',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.blockFairy(1, () => {
									console.log('Done');
								});
							}
						}
					})
				}));
				
				menu.append(DIV({
					c : A({
						c : ' 특정 요정 차단 해제',
						on : {
							tap : () => {
								EtherFairy.EtherFairyContractController.unblockFairy(1, () => {
									console.log('Done');
								});
							}
						}
					})
				}));*/
			}
		});
	}
});
