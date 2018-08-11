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
				padding : 10,
				backgroundImage : EtherFairy.R('rankbg.jpg'),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			},
			c : [
			totalFairyInfoPanel = DIV(),
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
