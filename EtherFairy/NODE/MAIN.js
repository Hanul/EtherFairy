EtherFairy.MAIN = METHOD({
	
	run : (addRequestHandler) => {
		
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			let saveFairyInfo = (fairyId) => {
				
				let fairyInfo = {};
				PARALLEL([
				(done) => {
					EtherFairy.EtherFairyContractController.getFairyBasicInfo(fairyId, (basicInfo) => {
						fairyInfo.fairyOriginId = basicInfo[0];
						fairyInfo.designer = basicInfo[1];
						fairyInfo.name = basicInfo[2];
						fairyInfo.birthTime = basicInfo[3];
						fairyInfo.appendedLevel = basicInfo[4];
						done();
					});
				},
				
				(done) => {
					EtherFairy.EtherFairyContractController.getFairyBasicPointsPerLevel(fairyId, (pointsPerLevel) => {
						fairyInfo.hpPointPerLevel = pointsPerLevel[0];
						fairyInfo.attackPointPerLevel = pointsPerLevel[1];
						fairyInfo.defensePointPerLevel = pointsPerLevel[2];
						fairyInfo.agilityPointPerLevel = pointsPerLevel[3];
						fairyInfo.dexterityPointPerLevel = pointsPerLevel[4];
						done();
					});
				},
				
				(done) => {
					
					EtherFairy.EtherFairyContractController.getFairyElementPointsPerLevel(fairyId, (pointsPerLevel) => {
						fairyInfo.firePointPerLevel = pointsPerLevel[0];
						fairyInfo.waterPointPerLevel = pointsPerLevel[1];
						fairyInfo.windPointPerLevel = pointsPerLevel[2];
						fairyInfo.earthPointPerLevel = pointsPerLevel[3];
						fairyInfo.lightPointPerLevel = pointsPerLevel[4];
						fairyInfo.darkPointPerLevel = pointsPerLevel[5];
						done();
					});
				},
				
				() => {
					fairyInfo.id = fairyId;
					
					// 이미 있으면 업데이트를, 없으면 새로 생성
					EtherFairy.FairyModel.get(fairyId, {
						notExists : () => {
							EtherFairy.FairyModel.create(fairyInfo);
						},
						success : () => {
							EtherFairy.FairyModel.update(fairyInfo);
						}
					});
				}]);
			};
			
			// 모든 요정 목록을 새로 불러옵니다.
			EtherFairy.EtherFairyContractController.getFairyCount((fairyCount) => {
				REPEAT(fairyCount, (id) => {
					saveFairyInfo(id);
				});
			});
			
			// 새 요정이 등록될 때 마다 정보를 가져옵니다.
			EtherFairy.EtherFairyContractController.on('BirthFairy', (result) => {
				saveFairyInfo(result.fairyId);
			});
			
			// 1분에 한번씩 요정들끼리 자동으로 서로 싸우게 합니다.
			//INTERVAL(60, () => {
				EtherFairy.FairyModel.find({
					isFindAll : true
				}, (fairyInfos) => {
					
					EACH(fairyInfos, (fairyInfo) => {
						
						EtherFairy.FairyModel.get({
							filter : {
								id : {
									$ne : fairyInfo.id
								}
							},
							isRandom : true
						}, (enemyFairyInfo) => {
							console.log(fairyInfo.id, enemyFairyInfo.id);
							
							let fairyLevel = EtherFairy.CalculateManager.calculateLevel(EtherFairy.CalculateManager.calculateEXP(fairyInfo.birthTime));
							let enemyFairyLevel = EtherFairy.CalculateManager.calculateLevel(EtherFairy.CalculateManager.calculateEXP(enemyFairyInfo.birthTime));
							
							console.log(EtherFairy.CalculateManager.battle({
								fairy1Info : {
									hp : EtherFairy.CalculateManager.calculateHP(fairyInfo.hpPointPerLevel * fairyLevel),
									damage : EtherFairy.CalculateManager.calculateDamage(fairyInfo.attackPointPerLevel * fairyLevel),
									defensePercent : EtherFairy.CalculateManager.calculateDefensePercent(fairyInfo.defensePointPerLevel * fairyLevel),
									attackSpeed : EtherFairy.CalculateManager.calculateAttackSpeed(fairyInfo.agilityPointPerLevel * fairyLevel),
									avoidability : EtherFairy.CalculateManager.calculateAvoidability(fairyInfo.dexterityPointPerLevel * fairyLevel),
									criticalPercent : EtherFairy.CalculateManager.calculateCriticalPercent(fairyInfo.dexterityPointPerLevel * fairyLevel),
									firePoint : fairyInfo.firePointPerLevel * fairyLevel,
									waterPoint : fairyInfo.waterPointPerLevel * fairyLevel,
									windPoint : fairyInfo.windPointPerLevel * fairyLevel,
									earthPoint : fairyInfo.earthPointPerLevel * fairyLevel,
									lightPoint : fairyInfo.lightPointPerLevel * fairyLevel,
									darkPoint : fairyInfo.darkPointPerLevel * fairyLevel
								},
								fairy2Info : {
									hp : EtherFairy.CalculateManager.calculateHP(enemyFairyInfo.hpPointPerLevel * enemyFairyLevel),
									damage : EtherFairy.CalculateManager.calculateDamage(enemyFairyInfo.attackPointPerLevel * enemyFairyLevel),
									defensePercent : EtherFairy.CalculateManager.calculateDefensePercent(enemyFairyInfo.defensePointPerLevel * enemyFairyLevel),
									attackSpeed : EtherFairy.CalculateManager.calculateAttackSpeed(enemyFairyInfo.agilityPointPerLevel * enemyFairyLevel),
									avoidability : EtherFairy.CalculateManager.calculateAvoidability(enemyFairyInfo.dexterityPointPerLevel * enemyFairyLevel),
									criticalPercent : EtherFairy.CalculateManager.calculateCriticalPercent(enemyFairyInfo.dexterityPointPerLevel * enemyFairyLevel),
									firePoint : enemyFairyInfo.firePointPerLevel * enemyFairyLevel,
									waterPoint : enemyFairyInfo.waterPointPerLevel * enemyFairyLevel,
									windPoint : enemyFairyInfo.windPointPerLevel * enemyFairyLevel,
									earthPoint : enemyFairyInfo.earthPointPerLevel * enemyFairyLevel,
									lightPoint : enemyFairyInfo.lightPointPerLevel * enemyFairyLevel,
									darkPoint : enemyFairyInfo.darkPointPerLevel * enemyFairyLevel
								}
							}));
						});
					});
				});
			//});
		}
	}
});
