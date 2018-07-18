EtherFairy.MasterHome = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		// 메타마스크가 설치되어 있는 경우
		if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			// 소유주가 존재하는지 체크
			EtherFairy.MasterModel.checkExists(EtherFairy.WalletManager.getWalletAddress(), (exists) => {
				
				// 존재하지 않으면, 생성
				if (exists !== true) {
					Yogurt.Prompt(MSG('PLEASE_ENTER_MASTER_NAME'), (value) => {
						
						EtherFairy.MasterModel.create({
							id : EtherFairy.WalletManager.getWalletAddress(),
							name : value
						}, () => {
							EtherFairy.GO('master');
						});
					});
				}
				
				else {
					
				}
			});
		}
		
		// 설치가 되어있지 않으면, 시작하기 화면으로 이동
		else {
			EtherFairy.GO('start');
		}
	}
});
