EtherFairy.BattleRecordModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			fairyId : {
				notEmpty : true,
				integer : true
			},
			
			enemyId : {
				notEmpty : true,
				integer : true
			},
			
			isWin : {
				notEmpty : true,
				bool : true
			}
		};
		
		return {
			name : 'BattleRecord',
			methodConfig : {
				create : false,
				update : false,
				remove : false
			}
		};
	}
});
