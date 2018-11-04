EtherFairy.MasterModel = OBJECT({
	
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
			},
			
			profileImageFileId : {
				id : true
			},
			
			fairyCount : {
				notEmpty : true,
				integer : true
			},
			
			totalFairyLevel : {
				notEmpty : true,
				integer : true
			},
			
			totalFairyRating : {
				notEmpty : true,
				integer : true
			}
		};
		
		return {
			name : 'Master',
			isNotUsingObjectId : true,
			initData : {
				fairyCount : 0,
				totalFairyLevel : 0,
				totalFairyRating : 0
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
