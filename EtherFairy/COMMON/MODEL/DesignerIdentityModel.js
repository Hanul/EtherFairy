EtherFairy.DesignerIdentityModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			adminPassword : true,

			name : {
				notEmpty : true
			},
			
			email : {
				notEmpty : true,
				size : {
					min : 5,
					max : 320
				},
				email : true
			},
			
			phoneNumber : {
				notEmpty : true
			}
		};
		
		return {
			name : 'DesignerIdentity',
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : false,
				remove : false
			}
		};
	}
});
