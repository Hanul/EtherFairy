EtherFairy.FairyModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			id : {
				notEmpty : true,
				integer : true
			},
			
			fairyOriginId : {
				notEmpty : true,
				id : true
			},
			
			designer : {
				notEmpty : true
			},
			
			name : {
				notEmpty : true
			},
			
			birthTime : {
				notEmpty : true,
				integer : true
			},
			
			appendedLevel : {
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
			
			defencePointPerLevel : {
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
			},
			
			rating : {
				notEmpty : true,
				integer : true
			}
		};
		
		return {
			name : 'Fairy',
			initData : {
				rating : 0
			},
			isNotUsingObjectId : true,
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
