EtherFairy.Ranking = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let etherFairyContractRoom = EtherFairy.ROOM('EtherFairyContract');
		
		let fairyList;
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : 'test'
			}),
			
			fairyList = DIV()]
		}));
		
		let createFairyItem = (fairyOriginId, fairyName, birthTime, appendedLevel) => {
			
			console.log(fairyOriginId, fairyName, birthTime, appendedLevel);
		};
		
		// 지갑을 사용할 때는 스마트 계약을 사용한다.
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			// 모든 소유주의 ID를 가져옵니다.
			EtherFairy.EtherFairyContractController.getMasterCount((masterCount) => {
				REPEAT(masterCount, (i) => {
					EtherFairy.EtherFairyContractController.getMasterAddress(i, (master) => {
						
						// 모든 요정을 가져옵니다.
						EtherFairy.EtherFairyContractController.balanceOf(master, (fairyCount) => {
							REPEAT(fairyCount, (j) => {
								EtherFairy.EtherFairyContractController.getFairyId(master, j, (fairyId) => {
									
									console.log(fairyId);
								});
							});
						});
					});
				});
			});
		}
		
		// 지갑을 사용할 수 없을때는 서버에서 가져온다.
		else {
			
			// 모든 소유주의 ID를 가져옵니다.
			etherFairyContractRoom.send('getMasterCount', (masterCount) => {
				REPEAT(masterCount, (i) => {
					etherFairyContractRoom.send({
						methodName : 'getMasterAddress',
						data : i
					}, (master) => {
						
						// 모든 요정을 가져옵니다.
						etherFairyContractRoom.send({
							methodName : 'balanceOf',
							data : master
						}, (fairyCount) => {
							REPEAT(fairyCount, (j) => {
								etherFairyContractRoom.send({
									methodName : 'getFairyId',
									data : {
										master : master,
										index : j
									}
								}, (fairyId) => {
									
									console.log(fairyId);
								});
							});
						});
					});
				});
			});
		}
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
