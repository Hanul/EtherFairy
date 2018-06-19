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
			
			hpLevel : {
				notEmpty : true,
				integer : true
			},
			
			attackLevel : {
				notEmpty : true,
				integer : true
			},
			
			defenseLevel : {
				notEmpty : true,
				integer : true
			},
			
			agilityLevel : {
				notEmpty : true,
				integer : true
			},
			
			dexterityLevel : {
				notEmpty : true,
				integer : true
			},
			
			fireLevel : {
				notEmpty : true,
				integer : true
			},
			
			waterLevel : {
				notEmpty : true,
				integer : true
			},
			
			windLevel : {
				notEmpty : true,
				integer : true
			},
			
			earthLevel : {
				notEmpty : true,
				integer : true
			},
			
			lightLevel : {
				notEmpty : true,
				integer : true
			},
			
			darkLevel : {
				notEmpty : true,
				integer : true
			}
		};
		
		return {
			name : 'FairyOrigin',
			initData : {
				
				point : 0,
				
				hpLevel : 5,
				attackLevel : 5,
				defenseLevel : 5,
				agilityLevel : 0,
				dexterityLevel : 0,
				
				fireLevel : 0,
				waterLevel : 0,
				windLevel : 0,
				earthLevel : 0,
				lightLevel : 0,
				darkLevel : 0
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
