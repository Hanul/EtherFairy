EtherFairy.EtherFairyContractRoom = OBJECT({

	init : (inner, self) => {
		
		EtherFairy.ROOM('EtherFairyContract', (clientInfo, on, off) => {
			
			on('getMasterCount', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getMasterCount(ret);
			});
			
			on('getMasterAddress', (index, ret) => {
				EtherFairy.EtherFairyContractController.getMasterAddress(index, ret);
			});
			
			on('balanceOf', (master, ret) => {
				EtherFairy.EtherFairyContractController.balanceOf(master, ret);
			});
			
			on('getFairyId', (params, ret) => {
				EtherFairy.EtherFairyContractController.getFairyId(params.master, params.index, ret);
			});
		});
	}
});
