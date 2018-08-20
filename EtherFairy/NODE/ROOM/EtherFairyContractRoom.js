EtherFairy.EtherFairyContractRoom = OBJECT({

	init : (inner, self) => {
		
		EtherFairy.ROOM('EtherFairyContract', (clientInfo, on, off) => {
			
			on('getFairyBasicInfo', (fairyId, ret) => {
				if (fairyId !== undefined) {
					EtherFairy.EtherFairyContractController.getFairyBasicInfo(fairyId, ret);
				}
			});
			
			on('getFairyBasicPointsPerLevel', (fairyId, ret) => {
				if (fairyId !== undefined) {
					EtherFairy.EtherFairyContractController.getFairyBasicPointsPerLevel(fairyId, ret);
				}
			});
			
			on('getFairyElementPointsPerLevel', (fairyId, ret) => {
				if (fairyId !== undefined) {
					EtherFairy.EtherFairyContractController.getFairyElementPointsPerLevel(fairyId, ret);
				}
			});
			
			on('getFairyIdsByBirthTime', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByBirthTime(ret);
			});
			
			on('getFairyIdsByAppendedLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByAppendedLevel(ret);
			});
			
			on('getFairyIdsByHPPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByHPPointPerLevel(ret);
			});
			
			on('getFairyIdsByAttackPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByAttackPointPerLevel(ret);
			});
			
			on('getFairyIdsByDefencePointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByDefencePointPerLevel(ret);
			});
			
			on('getFairyIdsByAgilityPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByAgilityPointPerLevel(ret);
			});
			
			on('getFairyIdsByDexterityPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByDexterityPointPerLevel(ret);
			});
			
			on('getFairyIdsByFirePointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByFirePointPerLevel(ret);
			});
			
			on('getFairyIdsByWaterPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByWaterPointPerLevel(ret);
			});
			
			on('getFairyIdsByWindPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByWindPointPerLevel(ret);
			});
			
			on('getFairyIdsByEarthPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByEarthPointPerLevel(ret);
			});
			
			on('getFairyIdsByLightPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByLightPointPerLevel(ret);
			});
			
			on('getFairyIdsByDarkPointPerLevel', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyIdsByDarkPointPerLevel(ret);
			});
			
			on('getFairyCount', (notUsing, ret) => {
				EtherFairy.EtherFairyContractController.getFairyCount(ret);
			});
		});
	}
});
