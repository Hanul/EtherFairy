OVERRIDE(EtherFairy.DesignerModel, (origin) => {

	EtherFairy.DesignerModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {
			
			const NOT_ALLOWED_USERNAME = [
				'',
				'about',
				'join',
				'login',
				'oauth',
				'logout',
				'apps',
				'admin',
				'administrator',
				'master',
				'gamemaster',
				'webmaster'
			];
			
			let loginValid = params.loginValid;

			let db = self.getDB();

			let rememberMeDB = EtherFairy.DB('RememberMe');
			
			let cleanUserData = (userData) => {
				delete userData.password;
				delete userData.ip;
				delete userData.isAgreedTerms;
				delete userData.isAgreedPrivacy;
			};
			
			inner.on('create', {

				before : (data, next, ret, clientInfo) => {
					
					let username = data.username;
					
					if (CHECK_IS_IN({
						array : NOT_ALLOWED_USERNAME,
						value : username
					}) === true) {
						
						ret({
							validErrors : {
								username : {
									type : 'notAllowed'
								}
							}
						});
					}
					
					else {
						
						let password = data.password;
						
						self.checkExists({
							filter : {
								username : username
							}
						}, (exists) => {
	
							if (exists === true) {
	
								ret({
									validErrors : {
										username : {
											type : 'existed'
										}
									}
								});
	
							} else {
	
								if (clientInfo !== undefined) {
									data.ip = clientInfo.ip;
								}
	
								data.password = SHA256({
									key : username,
									password : password
								});
								
								data.roles = [EtherFairy.ROLE.DESIGNER];
	
								next();
							}
						});
					}

					return false;
				},

				after : (savedData) => {
					cleanUserData(savedData);
				}
			});
			
			inner.on('update', {

				before : (data, next, ret, clientInfo) => {
					
					let username = data.username;
					
					if (CHECK_IS_IN({
						array : NOT_ALLOWED_USERNAME,
						value : username
					}) === true) {
						
						ret({
							validErrors : {
								username : {
									type : 'notAllowed'
								}
							}
						});
					}
					
					else {
						
						let password = data.password;
						
						if (clientInfo !== undefined) {
							data.ip = clientInfo.ip;
						}
						
						self.get(data.id, (savedData) => {
							
							// 아이디가 기존과 같고 비밀번호만 바꾸는 경우
							if (data.username === savedData.username) {
								
								if (data.password !== undefined) {
									data.password = SHA256({
										key : username,
										password : password
									});
								}
								
								next();
							}
							
							// 아이디를 변경하는 경우
							else if (data.username !== undefined) {
								
								self.checkExists({
									filter : {
										username : username
									}
								}, (exists) => {
			
									if (exists === true) {
			
										ret({
											validErrors : {
												username : {
													type : 'existed'
												}
											}
										});
			
									} else {
										
										// 비밀번호도 변경하는 경우
										if (data.password !== undefined) {
											data.password = SHA256({
												key : username,
												password : password
											});
										}
										
										next();
									}
								});
							}
							
							// 아이디 변경 없이 비밀번호만 변경하는 경우
							else if (data.password !== undefined) {
								
								data.password = SHA256({
									key : savedData.username,
									password : password
								});
								
								next();
							}
							
							// 아이디 및 비밀번호 변경이 아닌 경우
							else {
								next();
							}
						});
					}

					return false;
				},
				
				after : (savedData) => {
					cleanUserData(savedData);
				}
			});
			
			inner.on('get', (savedData) => {
				cleanUserData(savedData);
			});
			
			inner.on('find', EACH((savedData) => {
				cleanUserData(savedData);
			}));
			
			EtherFairy.ROOM(self.getName(), (clientInfo, on) => {

				on('login', (data, ret) => {
					
					if (data !== undefined) {
						
						let validResult = loginValid.checkAndWash(data);
	
						if (validResult.checkHasError() === true) {
							ret({
								validErrors : validResult.getErrors()
							});
						}
						
						else {
							
							let username = data.username;
							let password = data.password;
	
							password = SHA256({
								key : username,
								password : password
							});
	
							self.get({
								filter : {
									username : username,
									password : password
								}
							}, {
								notExists : () => {
	
									ret({
										validErrors : {
											username : {
												type : 'login'
											}
										}
									});
								},
								success : (userData) => {
									
									clientInfo.roles = userData.roles;
									clientInfo.authKey = userData.id;
									
									self.updateNoHistory({
										id : userData.id,
										language : data.language,
										lastLoginTime : new Date(),
										$inc : {
											loginCount : 1
										}
									}, (savedData) => {
										
										rememberMeDB.create({
											userId : userData.id
										}, (rememberMeData) => {
											
											cleanUserData(savedData);
											
											ret({
												savedData : savedData,
												rememberMeKey : rememberMeData.id
											});
										});
									});
								}
							});
						}
					}
				});
				
				on('resign', (key, ret) => {
					
					if (key !== undefined) {
						
						rememberMeDB.get(key, {
							
							notExists : () => {
								ret();
							},
							
							success : (rememberMeData) => {
								
								self.get(rememberMeData.userId, (signedUserData) => {
									
									clientInfo.roles = signedUserData.roles;
									clientInfo.authKey = signedUserData.id;
									
									cleanUserData(signedUserData);
									
									ret(signedUserData);
								});
							}
						});
					}
				});
				
				on('logout', (key, ret) => {
					
					if (key !== undefined) {
						
						rememberMeDB.get(key, {
							
							notExists : () => {
								ret();
							},
							
							success : (rememberMeData) => {
								
								if (rememberMeData.userId === clientInfo.authKey) {
									
									clientInfo.roles = undefined;
									clientInfo.authKey = undefined;
									
									rememberMeDB.remove(key, () => {
										ret();
									});
								}
							}
						});
					}
				});
			});
		}
	});
});
