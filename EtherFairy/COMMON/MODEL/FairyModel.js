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
			
			name : {
				notEmpty : true,
				size : {
					min : 1,
					max : 20
				}
			}
		};
		
		return {
			name : 'Fairy',
			initData : {
				point : 0
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
