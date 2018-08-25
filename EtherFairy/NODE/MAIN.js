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
						fairyInfo.defencePointPerLevel = pointsPerLevel[2];
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
			
			// 10분에 한번씩 요정들끼리 자동으로 서로 싸우게 합니다.
			INTERVAL(600, () => {
				EtherFairy.FairyModel.find({
					isFindAll : true
				}, (fairyDataSet) => {
					
					EACH(fairyDataSet, (fairyData) => {
						
						EtherFairy.FairyModel.get({
							filter : {
								id : {
									$ne : fairyData.id
								}
							},
							isRandom : true
						}, (enemyFairyData) => {
							
							let battleResult = EtherFairy.CalculateManager.battle({
								fairyData : fairyData,
								enemyData : enemyFairyData
							});
							
							battleResult.fairyId = fairyData.id;
							battleResult.enemyId = enemyFairyData.id;
							
							// 전투 결과 기록
							EtherFairy.BattleResultModel.create(battleResult);
						});
					});
				});
			});
		}
	}
});
