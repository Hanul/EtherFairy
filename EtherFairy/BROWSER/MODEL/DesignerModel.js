OVERRIDE(EtherFairy.DesignerModel, (origin) => {
	
	EtherFairy.DesignerModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {

			let loginValid = params.loginValid;

			let room = self.getRoom();
			
			let signedUserData;
			
			let rememberMeStore = EtherFairy.STORE('rememberMeStore');
			
			let setSignedUserData = self.setSignedUserData = (_signedUserData) => {
				//REQUIRED: signedUserData
				
				signedUserData = _signedUserData;
			};

			let login = self.login = (data, callbackOrHandlers) => {
				//REQUIRED: data
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.notValid
				//REQUIRED: callbackOrHandlers.success
				
				let notValidHandler;
				let callback;
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					notValidHandler = callbackOrHandlers.notValid;
					callback = callbackOrHandlers.success;
				}
				
				data.countryCode = INFO.getLang().substring(0, 2);
				
				let validResult = loginValid.checkAndWash(data);
				
				if (validResult.checkHasError() === true) {
					if (notValidHandler !== undefined) {
						notValidHandler(validResult.getErrors());
					}
				}
				
				else {

					room.send({
						methodName : 'login',
						data : data
					}, (result) => {
						
						let validErrors = result.validErrors;
						let savedData = result.savedData;
						let rememberMeKey = result.rememberMeKey;

						if (validErrors !== undefined) {
							if (notValidHandler !== undefined) {
								notValidHandler(validErrors);
							}
						}
						
						else if (savedData !== undefined) {
							
							signedUserData = savedData;
							
							rememberMeStore.save({
								name : 'key',
								value : rememberMeKey
							});
							
							callback(savedData);
							
							// 푸시 키의 주인을 변경합니다.
							if (BROWSER_CONFIG.__PUSH_KEY !== undefined) {
								POST({
									uri : 'savepushkeyuser',
									params : {
										pushKey : BROWSER_CONFIG.__PUSH_KEY,
										userId : signedUserData.id
									}
								});
							}
						}
					});
				}
			};
			
			let logout = self.logout = () => {
				
				if (rememberMeStore.get('key') !== undefined) {
					
					room.send({
						methodName : 'logout',
						data : rememberMeStore.get('key')
					}, () => {
						
						rememberMeStore.remove('key');
						
						signedUserData = undefined;
						
						EtherFairy.REFRESH('');
					});
				}
			};
			
			let checkSigned = self.checkSigned = (nextURI, callbackOrHandlers) => {
				//OPTIONAL: nextURI
				//REQUIRED: callbackOrHandlers
				//OPTIONAL: callbackOrHandlers.fail
				//REQUIRED: callbackOrHandlers.success
				
				let failHandler;
				let callback;
				
				if (callbackOrHandlers === undefined) {
					callbackOrHandlers = nextURI;
					nextURI = undefined;
				}
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					failHandler = callbackOrHandlers.fail;
					callback = callbackOrHandlers.success;
				}
				
				if (signedUserData !== undefined) {
					callback(signedUserData);
				}
				
				else if (rememberMeStore.get('key') !== undefined) {
					
					room.send({
						methodName : 'resign',
						data : rememberMeStore.get('key')
					}, (_signedUserData) => {
						
						if (_signedUserData === undefined) {
							
							if (nextURI !== undefined) {
								DELAY(() => {
									EtherFairy.GO({
										uri : 'login',
										data : {
											nextURI : nextURI
										}
									});
								});
							}
							
							else if (failHandler !== undefined) {
								failHandler();
							}
						}
						
						else {
							callback(signedUserData = _signedUserData);
							
							// 푸시 키의 주인을 변경합니다.
							if (BROWSER_CONFIG.__PUSH_KEY !== undefined) {
								POST({
									uri : 'savepushkeyuser',
									params : {
										pushKey : BROWSER_CONFIG.__PUSH_KEY,
										userId : signedUserData.id
									}
								});
							}
						}
					});
				}
				
				else if (nextURI !== undefined) {
					DELAY(() => {
						EtherFairy.GO({
							uri : 'login',
							data : {
								nextURI : nextURI
							}
						});
					});
				}
				
				else if (failHandler !== undefined) {
					failHandler();
				}
			};
		}
	});
});
