EtherFairy.FairyOrigin = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let fairyOriginId = params.fairyOriginId;
			
			EtherFairy.FairyOriginModel.get(fairyOriginId, (fairyOriginData) => {
				
				console.log(fairyOriginData);
				
				let masterMenu;
				EtherFairy.Layout.setContent(DIV({
					style : {
						padding : 10
					},
					c : [
					
					H1({
						style : {
							fontSize : 30,
							fontWeight : 'bold',
							color : '#FFEA4F',
							marginBottom : 20
						},
						c : fairyOriginData.name
					}),
					
					IMG({
						style : {
							width : 250
						},
						src : EtherFairy.RF(fairyOriginData.imageFileId)
					}),
					
					P({
						c : [
						fairyOriginData.firePointPerLevel,
						fairyOriginData.waterPointPerLevel,
						fairyOriginData.windPointPerLevel,
						fairyOriginData.earthPointPerLevel,
						fairyOriginData.lightPointPerLevel,
						fairyOriginData.darkPointPerLevel
						]
					}),
					
					masterMenu = DIV()]
				}));
				
				// 소유주가 접속해 있으면 소유주 메뉴 추가
				if (EtherFairy.WalletManager.checkIsLocked() !== true) {
					EtherFairy.MasterModel.get(EtherFairy.WalletManager.getWalletAddress(), {
						notExists : () => {
							// ignore.
						},
						success : () => {
							
							masterMenu.append(Yogurt.Button({
								c : MSG('BUY_FAIRY_BUTTON'),
								on : {
									tap : () => {
										
										// 이름 입력받기
										Yogurt.Prompt(MSG('PLEASE_ENTER_FAIRY_NAME'), (fairyName) => {
											
											// 계약 생성
											let contract = web3.eth.contract(EtherFairy.SmartContractABI).at(EtherFairy.SmartContractAddress);
											
											// 요정 탄생시키기
											contract.birthFairy(
												fairyOriginData.id,
												'0x38b4343b3BE52374D83398159F2FA06ef78bDA7D',
												fairyName,
												fairyOriginData.firePointPerLevel,
												fairyOriginData.waterPointPerLevel,
												fairyOriginData.windPointPerLevel,
												fairyOriginData.earthPointPerLevel,
												fairyOriginData.lightPointPerLevel,
												fairyOriginData.darkPointPerLevel, {
												
												value : web3.toWei(0.01, 'ether')
											}, (error, result) => {
												
												// 계약 실행 오류 발생
												if (error !== TO_DELETE) {
													alert(error.toString());
												}
												
												// 정상 작동
												else {
													
													let retry = RAR(() => {
														
														web3.eth.getTransactionReceipt(result, (error, result) => {
															
															// 트랜잭선 오류 발생
															if (error !== TO_DELETE) {
																alert(error.toString());
															}
															
															// 아무런 값이 없으면 재시도
															else if (result === TO_DELETE) {
																retry();
															}
															
															// 트랜잭션 완료
															else {
																alert('트랜잭션이 완료되었습니다.');
															}
														});
													});
												}
											});	
										});
									}
								}
							}));
						}
					});
				}
			});
		});
	}
});
