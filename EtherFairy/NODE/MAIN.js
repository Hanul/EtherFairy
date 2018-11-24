EtherFairy.MAIN = METHOD({
	
	run : (addRequestHandler) => {
		
		if (CPU_CLUSTERING.getWorkerId() === 1) {
			
			let saveFairyInfo = (fairyId) => {
				
				let fairyInfo = {};
				PARALLEL([
				(done) => {
					EtherFairy.EtherFairyContract.getFairyBasicInfo(fairyId, (fairyOriginId, designer, name, birthTime, appendedLevel) => {
						fairyInfo.fairyOriginId = fairyOriginId;
						fairyInfo.designer = designer;
						fairyInfo.name = name;
						fairyInfo.birthTime = birthTime;
						fairyInfo.appendedLevel = appendedLevel;
						done();
					});
				},
				
				(done) => {
					EtherFairy.EtherFairyContract.getFairyBasicPointsPerLevel(fairyId, (hpPointPerLevel, attackPointPerLevel, defencePointPerLevel, agilityPointPerLevel, dexterityPointPerLevel) => {
						fairyInfo.hpPointPerLevel = hpPointPerLevel;
						fairyInfo.attackPointPerLevel = attackPointPerLevel;
						fairyInfo.defencePointPerLevel = defencePointPerLevel;
						fairyInfo.agilityPointPerLevel = agilityPointPerLevel;
						fairyInfo.dexterityPointPerLevel = dexterityPointPerLevel;
						done();
					});
				},
				
				(done) => {
					
					EtherFairy.EtherFairyContract.getFairyElementPointsPerLevel(fairyId, (firePointPerLevel, waterPointPerLevel, windPointPerLevel, earthPointPerLevel, lightPointPerLevel, darkPointPerLevel) => {
						fairyInfo.firePointPerLevel = firePointPerLevel;
						fairyInfo.waterPointPerLevel = waterPointPerLevel;
						fairyInfo.windPointPerLevel = windPointPerLevel;
						fairyInfo.earthPointPerLevel = earthPointPerLevel;
						fairyInfo.lightPointPerLevel = lightPointPerLevel;
						fairyInfo.darkPointPerLevel = darkPointPerLevel;
						done();
					});
				},
				
				() => {
					fairyInfo.id = fairyId;
					
					// 이미 있으면 업데이트를, 없으면 새로 생성
					EtherFairy.FairyModel.get(fairyId, {
						notExists : () => {
							
							EtherFairy.FairyModel.create(fairyInfo);
							
							EtherFairy.EtherFairyContract.ownerOf(fairyId, (masterId) => {
								
								EtherFairy.MasterModel.update({
									id : masterId.toLowerCase(),
									$inc : {
										fairyCount : 1
									}
								});
							});
						},
						
						success : () => {
							EtherFairy.FairyModel.update(fairyInfo);
						}
					});
				}]);
			};
			
			// 모든 요정 목록을 새로 불러옵니다.
			EtherFairy.EtherFairyContract.getFairyCount((fairyCount) => {
				REPEAT(fairyCount, (id) => {
					saveFairyInfo(id);
				});
			});
			
			// 새 요정이 등록될 때 마다 정보를 가져옵니다.
			EtherFairy.EtherFairyContract.on('BirthFairy', (result) => {
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
									$ne : [fairyData.id, fairyData.lastEnemyFairyId]
								},
								rating : {
									$gte : fairyData.rating - 100,
									$lte : fairyData.rating + 100
								}
							},
							isRandom : true
						}, {
							notExists : () => {
								// 매칭 상대를 찾을 수 없음
							},
							success : (enemyFairyData) => {
								
								let battleResult = EtherFairy.CalculateManager.battle({
									fairyData : fairyData,
									enemyData : enemyFairyData
								});
								
								battleResult.fairyId = fairyData.id;
								battleResult.enemyId = enemyFairyData.id;
								
								// 점수 변동
								if (battleResult.isWin === true) {
									
									let ratingUp = 10 + fairyData.winningStreak * 3;
									
									battleResult.fairyRatingChange = ratingUp;
									
									EtherFairy.FairyModel.update({
										id : fairyData.id,
										$inc : {
											rating : ratingUp,
											winningStreak : 1
										},
										losingStreak : 0
									});
									
									let ratingDown = 10 + enemyFairyData.losingStreak * 3;
									
									battleResult.enemyRatingChange = -ratingDown;
									
									EtherFairy.FairyModel.update({
										id : enemyFairyData.id,
										$inc : {
											rating : enemyFairyData.rating < ratingDown ? -enemyFairyData.rating : -ratingDown,
											losingStreak : 1
										},
										winningStreak : 0
									}, (savedData) => {
										if (savedData.rating < 0) {
											EtherFairy.FairyModel.update({
												id : savedData.id,
												rating : 0
											});
										}
									});
								}
								
								else {
									
									let ratingUp = 10 + enemyFairyData.winningStreak * 3;
									
									battleResult.enemyRatingChange = ratingUp;
									
									EtherFairy.FairyModel.update({
										id : enemyFairyData.id,
										$inc : {
											rating : ratingUp,
											winningStreak : 1
										},
										losingStreak : 0
									});
									
									let ratingDown = 10 + fairyData.losingStreak * 3;
									
									battleResult.fairyRatingChange = -ratingDown;
									
									EtherFairy.FairyModel.update({
										id : fairyData.id,
										$inc : {
											rating : fairyData.rating < ratingDown ? -fairyData.rating : -ratingDown,
											losingStreak : 1
										},
										winningStreak : 0
									}, (savedData) => {
										if (savedData.rating < 0) {
											EtherFairy.FairyModel.update({
												id : savedData.id,
												rating : 0
											});
										}
									});
								}
								
								// 전투 결과 기록
								EtherFairy.BattleResultModel.create(battleResult);
							}
						});
					});
				});
			});
		}
	}
});
