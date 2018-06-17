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
			
			nickname : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			},

			isAgreedTerms : {
				notEmpty : true,
				equal : true
			},

			isAgreedPrivacy : {
				notEmpty : true,
				equal : true
			},
			
			language : {
				size : {
					max : 5
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
