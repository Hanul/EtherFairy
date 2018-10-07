OVERRIDE(EtherFairy.FairyOriginModel, (origin) => {

	EtherFairy.FairyOriginModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {
			
			inner.on('create', {

				before : (data, next, ret) => {
					
					if (
					data.firePointPerLevel +
					data.waterPointPerLevel +
					data.windPointPerLevel +
					data.earthPointPerLevel +
					data.lightPointPerLevel +
					data.darkPointPerLevel !== 5) {
						
						ret({
							validErrors : {
								firePointPerLevel : {
									type : 'totalPointIsNot5'
								}
							}
						});
						
						return false;
					}
				}
			});
		}
	});
});
