EtherFairy.DesignerModel = OBJECT({
	
	preset : () => {
		return EtherFairy.MODEL;
	},
	
	params : () => {

		let validDataSet = {
			
			valkyrieId : {
				notEmpty : true,
				id : true
			},
			
			type : {
				notEmpty : true,
				size : {
					max : 256
				}
			},
			
			level : {
				notEmpty : true,
				integer : true
			}
		};
		
		return {
			name : 'Designer',
			initData : {
				level : 1
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
