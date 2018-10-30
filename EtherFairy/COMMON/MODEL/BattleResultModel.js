EtherFairy.BattleResultModel = OBJECT({
	
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
			
			fairyLevel : {
				notEmpty : true,
				integer : true
			},
			
			enemyLevel : {
				notEmpty : true,
				integer : true
			},
			
			fairyHP : {
				notEmpty : true,
				real : true
			},
			
			enemyHP : {
				notEmpty : true,
				real : true
			},
			
			fairyDamage : {
				notEmpty : true,
				real : true
			},
			
			enemyDamage : {
				notEmpty : true,
				real : true
			},
			
			fairyTurn : {
				notEmpty : true,
				real : true
			},
			
			enemyTurn : {
				notEmpty : true,
				real : true
			},
			
			fairyRatingChange : {
				notEmpty : true,
				real : true
			},
			
			enemyRatingChange : {
				notEmpty : true,
				real : true
			},
			
			isWin : {
				notEmpty : true,
				bool : true
			}
		};
		
		return {
			name : 'BattleResult',
			methodConfig : {
				create : false,
				update : false,
				remove : false
			}
		};
	}
});
