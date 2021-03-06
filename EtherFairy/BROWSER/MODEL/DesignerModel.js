OVERRIDE(EtherFairy.DesignerModel, (origin) => {
	
	EtherFairy.DesignerModel = OBJECT({

		preset : () => {
			return origin;
		},

		init : (inner, self, params) => {

			let loginValid = params.loginValid;

			let room = self.getRoom();
			
			let signedDesignerData;
			
			let rememberMeStore = EtherFairy.STORE('rememberMeStore');
			
			let setSignedDesignerData = self.setSignedDesignerData = (_signedDesignerData) => {
				//REQUIRED: signedDesignerData
				
				signedDesignerData = _signedDesignerData;
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
							
							signedDesignerData = savedData;
							
							rememberMeStore.save({
								name : 'key',
								value : rememberMeKey
							});
							
							callback(savedData);
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
						
						signedDesignerData = undefined;
						
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
				
				if (signedDesignerData !== undefined) {
					callback(signedDesignerData);
				}
				
				else if (rememberMeStore.get('key') !== undefined) {
					
					room.send({
						methodName : 'resign',
						data : rememberMeStore.get('key')
					}, (_signedDesignerData) => {
						
						if (_signedDesignerData === undefined) {
							
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
							callback(signedDesignerData = _signedDesignerData);
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
