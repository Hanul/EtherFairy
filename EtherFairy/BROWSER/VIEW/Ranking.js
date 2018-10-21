EtherFairy.Ranking = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		let totalFairyInfoPanel;
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				margin : 'auto',
				width : 1110,
				padding : '30px 0 50px 10px',
				onDisplayResize : (width, height) => {
					if (width < 1300) {
						return {
							width : 760
						};
					}
				}
			},
			c : [
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					marginBottom : 20
				},
				c : MSG('RANKING_TITLE')
			}),
			
			totalFairyInfoPanel = DIV(),
			fairyList = DIV({
				c : IMG({
					style : {
						width : 100
					},
					src : EtherFairy.R('loading.svg')
				})
			})]
		}));
		
		// 지갑을 사용할 때는 스마트 계약을 사용한다.
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			EtherFairy.EtherFairyContractController.getFairyCount((fairyCount) => {
				totalFairyInfoPanel.append(MSG('TOTAL_FAIRY_COUNT') + ' : ' + fairyCount);
			});
			
			EtherFairy.EtherFairyContractController.getFairyIdsByBirthTime((fairyIds) => {
				
				fairyList.empty();
				
				EACH(fairyIds, (fairyId) => {
					
					fairyList.append(EtherFairy.FairyCard({
						style : {
							marginTop : 10,
							marginRight : 10,
							flt : 'left',
							cursor : 'pointer',
							onDisplayResize : (width, height) => {
								if (width < 1300) {
									return {
										transform : 'scale(0.5)',
										transformOrigin : 'left top',
										width : 180,
										height : 300
									};
								} else {
									return {
										transform : undefined,
										transformOrigin : undefined,
										width : 360,
										height : 600
									};
								}
							}
						},
						fairyId : fairyId,
						on : {
							tap : () => {
								EtherFairy.GO('fairy/' + fairyId);
							}
						}
					}));
				});
				
				fairyList.append(CLEAR_BOTH());
			});
		}
		
		// 지갑을 사용할 수 없을때는 서버에서 가져온다.
		else {
			
			etherFairyContractRoom.send('getFairyCount', (fairyCount) => {
				totalFairyInfoPanel.append(MSG('TOTAL_FAIRY_COUNT') + ' : ' + fairyCount);
			});
			
			// 모든 소유주의 ID를 가져옵니다.
			etherFairyContractRoom.send('getFairyIdsByBirthTime', (fairyIds) => {
				
				fairyList.empty();
				
				EACH(fairyIds, (fairyId) => {
					
					fairyList.append(EtherFairy.FairyCard({
						style : {
							marginTop : 10,
							marginRight : 10,
							flt : 'left',
							cursor : 'pointer'
						},
						fairyId : fairyId,
						on : {
							tap : () => {
								EtherFairy.GO('fairy/' + fairyId);
							}
						}
					}));
				});
				
				fairyList.append(CLEAR_BOTH());
			});
		}
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
