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
			
			//console.log(fairyOriginId, fairyName, birthTime, appendedLevel);
		};
		
		// 지갑을 사용할 때는 스마트 계약을 사용한다.
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			EtherFairy.EtherFairyContractController.getFairyIdsByBirthTime((fairyIds) => {
				EACH(fairyIds, (fairyId) => {
					EtherFairy.EtherFairyContractController.getFairyBasicInfo(fairyId, console.log);
					EtherFairy.EtherFairyContractController.getFairyBasicPointsPerLevel(fairyId, console.log);
					EtherFairy.EtherFairyContractController.getFairyElementPointsPerLevel(fairyId, console.log);
				});
			});
		}
		
		// 지갑을 사용할 수 없을때는 서버에서 가져온다.
		else {
			
			// 모든 소유주의 ID를 가져옵니다.
			etherFairyContractRoom.send('getFairyIdsByBirthTime', (fairyIds) => {
				EACH(fairyIds, (fairyId) => {
					etherFairyContractRoom.send({
						methodName : 'getFairyIdsByBirthTime',
						data : fairyId
					}, console.log);
					etherFairyContractRoom.send({
						methodName : 'getFairyBasicPointsPerLevel',
						data : fairyId
					}, console.log);
					etherFairyContractRoom.send({
						methodName : 'getFairyElementPointsPerLevel',
						data : fairyId
					}, console.log);
				});
			});
		}
		
		inner.on('remove', () => {
			etherFairyContractRoom.exit();
		});
	}
});
