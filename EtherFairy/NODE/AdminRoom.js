EtherFairy.AdminRoom = OBJECT({

	init : (inner, self) => {
		
		EtherFairy.ROOM('Admin', (clientInfo, on, off) => {
			
			let checkIsAdmin = () => {
				return clientInfo !== undefined && clientInfo.roles !== undefined && CHECK_IS_IN({
					array : clientInfo.roles,
					value : EtherFairy.ROLE.ADMIN
				}) === true;
			};
			
			// 운영자 로그인
			on('auth', (password, ret) => {
				if (password === NODE_CONFIG.EtherFairy.adminPassword) {
					clientInfo.roles = [EtherFairy.ROLE.USER, EtherFairy.ROLE.ADMIN];
					ret(password === NODE_CONFIG.EtherFairy.adminPassword);
				} else {
					ret(false);
				}
			});
		});
	}
});
