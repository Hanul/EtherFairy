EtherFairy.AdminController = OBJECT({

	init : (inner, self) => {
		
		let adminRoom = EtherFairy.ROOM('Admin');
		
		let auth = self.auth = (callback) => {
			
			let passwordStore = EtherFairy.COOKIE_STORE('passwordStore');
			let password = passwordStore.get('password');
			
			if (password === undefined) {
				password = prompt('Ether Fairy 관리자 페이지');
			}
			
			adminRoom.send({
				methodName : 'auth',
				data : password
			}, (isOk) => {
				if (isOk === true) {
					
					passwordStore.save({
						name : 'password',
						value : password,
						isToSession : true
					});
					
					callback();
				}
			});
		};
		
		let check = self.check = (callback) => {
			
			adminRoom.send('checkIsAdmin', (isAdmin) => {
				
				if (isAdmin === true) {
					callback();
				}
			});
		};
	}
});
