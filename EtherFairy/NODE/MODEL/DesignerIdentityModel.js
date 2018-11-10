OVERRIDE(EtherFairy.DesignerIdentityModel, (origin) => {

	EtherFairy.DesignerIdentityModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {
			
			let db = self.getDB();

			inner.on('create', {

				before : (data, next, ret, clientInfo) => {
					
					if (data.adminPassword !== NODE_CONFIG.EtherFairy.adminPassword) {
						
						ret({
							validErrors : {
								adminPassword : {
									type : 'wrong'
								}
							}
						});
						
						return false;
					}
					
					delete data.adminPassword;
				}
			});
		}
	});
});
