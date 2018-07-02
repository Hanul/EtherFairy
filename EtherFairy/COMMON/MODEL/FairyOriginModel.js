EtherFairy.FairyOriginModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			designerId : {
				notEmpty : true,
				id : true
			},
			
			name : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			},
			
			imageFileId : {
				notEmpty : true,
				id : true
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
			methodConfig : {
				create : {
					valid : VALID(validDataSet),
					authKey : 'designerId'
				},
				update : {
					valid : VALID(validDataSet),
					authKey : 'designerId'
				},
				remove : false
			}
		};
	}
});
