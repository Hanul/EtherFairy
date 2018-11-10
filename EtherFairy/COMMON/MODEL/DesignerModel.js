EtherFairy.DesignerModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			identityCode : {
				notEmpty : true,
				id : true
			},

			username : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				},
				username : true
			},
			
			nickname : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			},
			
			email : {
				notEmpty : true,
				size : {
					min : 5,
					max : 320
				},
				email : true
			},
			
			password : {
				notEmpty : true,
				size : {
					min : 4,
					max : 20
				}
			},
			
			loginCount : {
				notEmpty : true,
				integer : true
			},
			
			lastLoginTime : {
				date : true
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
			
			roles : {
				array : true
			},
			
			profileImageFileId : {
				id : true
			}
		};
		
		return {
			name : 'Designer',
			initData : {
				loginCount : 0
			},
			methodConfig : {
				create : {
					valid : VALID(validDataSet)
				},
				update : {
					valid : VALID(validDataSet),
					authKey : 'id',
					role : EtherFairy.ROLE.DESIGNER,
					adminRole : EtherFairy.ROLE.ADMIN
				},
				remove : false
			},
			loginValid : VALID({
				username : validDataSet.username,
				password : validDataSet.password,
				language : validDataSet.language
			})
		};
	}
});
