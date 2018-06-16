EtherFairy.OwnerModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			// same as wallet address
			id : {
				notEmpty : true,
				size : 42
			},
			
			name : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			}
		};
		
		return {
			name : 'Owner',
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
