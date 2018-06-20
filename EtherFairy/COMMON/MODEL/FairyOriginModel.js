EtherFairy.FairyOriginModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			point : {
				notEmpty : true,
				integer : true
			},
			
			fairyRootPercent : {
				notEmpty : true,
				integer : true
			},
			
			hpPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			attackPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			defensePointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			agilityPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			dexterityPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			firePointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			waterPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			windPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			earthPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			lightPointPerLevel : {
				notEmpty : true,
				integer : true
			},
			
			darkPointPerLevel : {
				notEmpty : true,
				integer : true
			}
		};
		
		return {
			name : 'FairyOrigin',
			initData : {
				point : 0
			},
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet)
				},
				remove : false
			}
		};
	}
});
