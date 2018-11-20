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
			
			description : {
				notEmpty : true,
				size : {
					max : 3000
				}
			},
			
			imageFileId : {
				notEmpty : true,
				id : true
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
			
			isInReview : {
				bool : true
			},
			
			isPublished : {
				bool : true
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
					authKey : 'designerId',
					adminRole : EtherFairy.ROLE.ADMIN
				},
				remove : false
			}
		};
	}
});
