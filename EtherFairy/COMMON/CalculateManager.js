EtherFairy.CalculateManager = OBJECT({
	
	init : (inner, self) => {
		
		// 경험치를 계산합니다.
		let calculateEXP = self.calculateEXP = (birthTime) => {
			//REQUIRED: birthTime
			
			let afterSeconds = INTEGER(Date.now() / 1000) - birthTime;
			
			return afterSeconds;
		};
		
		// 레벨을 계산합니다.
		let calculateLevel = self.calculateLevel = (exp) => {
			//REQUIRED: exp
			
			let needExp = 0;
			let resultLevel = 0;
			
			REPEAT({
				start : 1,
				end : 9999
			}, (level) => {
				
				needExp += 10 * (level - 1) * (level - 1) * level;
				
				if (exp >= needExp) {
					resultLevel = level;
				} else {
					return false;
				}
			});
			
			return resultLevel;
		};
		
		// HP Point로부터 HP를 계산합니다.
		let calculateHP = self.calculateHP = (hpPoint) => {
			//REQUIRED: hpPoint
			
			return hpPoint * 100;
		};
		
		// Attack Point로부터 공격력을 계산합니다.
		let calculateDamage = self.calculateDamage = (attackPoint) => {
			//REQUIRED: attackPoint
			
			return attackPoint * 5;
		};
		
		// Defence Point로부터 방어력을 계산합니다.
		let calculateDefencePercent = self.calculateDefencePercent = (defencePoint) => {
			//REQUIRED: defencePoint
			
			return parseFloat((Math.log10(defencePoint * defencePoint) * Math.log10(defencePoint * defencePoint)).toFixed(2));
		};
		
		// Agility Point로부터 공격 속도를 계산합니다.
		let calculateAttackSpeed = self.calculateAttackSpeed = (agilityPoint) => {
			//REQUIRED: agilityPoint
			
			return 100 + agilityPoint / 2;
		};
		
		// Dexterity Point로부터 회피율를 계산합니다.
		let calculateAvoidability = self.calculateAvoidability = (dexterityPoint) => {
			//REQUIRED: dexterityPoint
			
			dexterityPoint += 1;
			
			return parseFloat((Math.log10(dexterityPoint * dexterityPoint) * Math.log10(dexterityPoint * dexterityPoint) / 2).toFixed(2));
		};
		
		// Dexterity Point로부터 치명타 확률을 계산합니다.
		let calculateCriticalPercent = self.calculateCriticalPercent = (dexterityPoint) => {
			//REQUIRED: dexterityPoint
			
			dexterityPoint += 1;
			
			return parseFloat((Math.log10(dexterityPoint * dexterityPoint) * Math.log10(dexterityPoint * dexterityPoint) / 2).toFixed(2));
		};
		
		let calculateElementDamagePercent = (type, targetType) => {
			
			if (type === 'fire') {
				if (targetType === 'wind') {
					return 50;
				}
				if (targetType === 'light') {
					return 25;
				}
			}
			
			if (type === 'water') {
				if (targetType === 'fire') {
					return 50;
				}
				if (targetType === 'light') {
					return 25;
				}
			}
			
			if (type === 'wind') {
				if (targetType === 'earth') {
					return 50;
				}
				if (targetType === 'light') {
					return 25;
				}
			}
			
			if (type === 'earth') {
				if (targetType === 'water') {
					return 50;
				}
				if (targetType === 'light') {
					return 25;
				}
			}
			
			if (type === 'light') {
				if (targetType === 'dark') {
					return 100;
				}
			}
			
			if (type === 'dark') {
				if (targetType === 'fire') {
					return 25;
				}
				if (targetType === 'water') {
					return 25;
				}
				if (targetType === 'wind') {
					return 25;
				}
				if (targetType === 'earth') {
					return 25;
				}
			}
			
			return 0;
		};
		
		let calculateElementAppendDamagePercent = (fairyInfo, enemyInfo) => {
			//REQUIRED: fairyInfo
			//REQUIRED: fairyInfo.firePoint
			//REQUIRED: fairyInfo.waterPoint
			//REQUIRED: fairyInfo.windPoint
			//REQUIRED: fairyInfo.earthPoint
			//REQUIRED: fairyInfo.lightPoint
			//REQUIRED: fairyInfo.darkPoint
			//REQUIRED: enemyInfo
			//REQUIRED: enemyInfo.firePoint
			//REQUIRED: enemyInfo.waterPoint
			//REQUIRED: enemyInfo.windPoint
			//REQUIRED: enemyInfo.earthPoint
			//REQUIRED: enemyInfo.lightPoint
			//REQUIRED: enemyInfo.darkPoint
			
			let appendDamagePercent = 0;
			
			if (fairyInfo.firePoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('fire', 'dark');
				}
			}
			
			if (fairyInfo.waterPoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('water', 'dark');
				}
			}
			
			if (fairyInfo.windPoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('wind', 'dark');
				}
			}
			
			if (fairyInfo.earthPoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('earth', 'dark');
				}
			}
			
			if (fairyInfo.lightPoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('light', 'dark');
				}
			}
			
			if (fairyInfo.darkPoint > 0) {
				if (enemyInfo.firePoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'fire');
				}
				if (enemyInfo.waterPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'water');
				}
				if (enemyInfo.windPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'wind');
				}
				if (enemyInfo.earthPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'earth');
				}
				if (enemyInfo.lightPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'light');
				}
				if (enemyInfo.darkPoint > 0) {
					appendDamagePercent += calculateElementDamagePercent('dark', 'dark');
				}
			}
			
			return appendDamagePercent;
		};
		
		let calculateElementDamage = self.calculateElementDamage = (elementPoint) => {
			//REQUIRED: elementPoint
			
			return elementPoint * 5;
		};
		
		let calculateTurn = (fairyInfo, enemyInfo) => {
			//REQUIRED: fairyInfo
			//REQUIRED: fairyInfo.hpPoint
			//REQUIRED: fairyInfo.attackPoint
			//REQUIRED: fairyInfo.defencePoint
			//REQUIRED: fairyInfo.strengthPoint
			//REQUIRED: fairyInfo.agilityPoint
			//REQUIRED: fairyInfo.dexterityPoint
			//REQUIRED: fairyInfo.firePoint
			//REQUIRED: fairyInfo.waterPoint
			//REQUIRED: fairyInfo.windPoint
			//REQUIRED: fairyInfo.earthPoint
			//REQUIRED: fairyInfo.lightPoint
			//REQUIRED: fairyInfo.darkPoint
			//REQUIRED: enemyInfo
			//REQUIRED: enemyInfo.hpPoint
			//REQUIRED: enemyInfo.attackPoint
			//REQUIRED: enemyInfo.defencePoint
			//REQUIRED: enemyInfo.strengthPoint
			//REQUIRED: enemyInfo.agilityPoint
			//REQUIRED: enemyInfo.dexterityPoint
			//REQUIRED: enemyInfo.firePoint
			//REQUIRED: enemyInfo.waterPoint
			//REQUIRED: enemyInfo.windPoint
			//REQUIRED: enemyInfo.earthPoint
			//REQUIRED: enemyInfo.lightPoint
			//REQUIRED: enemyInfo.darkPoint
			
			// 데미지 계산
			let damage = (calculateDamage(fairyInfo.attackPoint)
				+ calculateElementDamage(fairyInfo.firePoint)
				+ calculateElementDamage(fairyInfo.waterPoint)
				+ calculateElementDamage(fairyInfo.windPoint)
				+ calculateElementDamage(fairyInfo.earthPoint)
				+ calculateElementDamage(fairyInfo.lightPoint)
				+ calculateElementDamage(fairyInfo.darkPoint)
			) * (100 - calculateDefencePercent(enemyInfo.defencePoint)) / 100 * (1 + calculateElementAppendDamagePercent(fairyInfo, enemyInfo) / 100);
			
			// 공격 횟수 계산
			let attackCount = calculateAttackSpeed(fairyInfo.agilityPoint) / 60 * (100 - calculateAvoidability(enemyInfo.dexterityPoint)) / 100;
			
			damage += damage * calculateCriticalPercent(fairyInfo.dexterityPoint) / 100 * 10;
			
			return {
				damage : damage,
				turn : calculateHP(enemyInfo.hpPoint) / (damage * attackCount)
			};
		};
		
		// 두 요정에 전투를 붙힙니다. (winner가 1이면 첫번째 요정의 승리, 2면 두번째 요정의 승리)
		let battle = self.battle = (params) => {
			//REQUIRED: params
			//REQUIRED: params.fairyData
			//REQUIRED: params.enemyData
			
			let fairyInfo = COPY(params.fairyData);
			let enemyInfo = COPY(params.enemyData);
			
			let fairyLevel = calculateLevel(calculateEXP(fairyInfo.birthTime)) + fairyInfo.appendedLevel;
			let enemyLevel = calculateLevel(calculateEXP(enemyInfo.birthTime)) + enemyInfo.appendedLevel;
			
			fairyInfo.hpPoint = fairyInfo.hpPointPerLevel * fairyLevel;
			fairyInfo.attackPoint = fairyInfo.attackPointPerLevel * fairyLevel;
			fairyInfo.defencePoint = fairyInfo.defencePointPerLevel * fairyLevel;
			fairyInfo.agilityPoint = fairyInfo.agilityPointPerLevel * fairyLevel;
			fairyInfo.dexterityPoint = fairyInfo.dexterityPointPerLevel * fairyLevel;
			
			fairyInfo.firePoint = fairyInfo.firePointPerLevel * fairyLevel;
			fairyInfo.waterPoint = fairyInfo.waterPointPerLevel * fairyLevel;
			fairyInfo.windPoint = fairyInfo.windPointPerLevel * fairyLevel;
			fairyInfo.earthPoint = fairyInfo.earthPointPerLevel * fairyLevel;
			fairyInfo.lightPoint = fairyInfo.lightPointPerLevel * fairyLevel;
			fairyInfo.darkPoint = fairyInfo.darkPointPerLevel * fairyLevel;
			
			enemyInfo.hpPoint = enemyInfo.hpPointPerLevel * fairyLevel;
			enemyInfo.attackPoint = enemyInfo.attackPointPerLevel * fairyLevel;
			enemyInfo.defencePoint = enemyInfo.defencePointPerLevel * fairyLevel;
			enemyInfo.agilityPoint = enemyInfo.agilityPointPerLevel * fairyLevel;
			enemyInfo.dexterityPoint = enemyInfo.dexterityPointPerLevel * fairyLevel;
			
			enemyInfo.firePoint = enemyInfo.firePointPerLevel * fairyLevel;
			enemyInfo.waterPoint = enemyInfo.waterPointPerLevel * fairyLevel;
			enemyInfo.windPoint = enemyInfo.windPointPerLevel * fairyLevel;
			enemyInfo.earthPoint = enemyInfo.earthPointPerLevel * fairyLevel;
			enemyInfo.lightPoint = enemyInfo.lightPointPerLevel * fairyLevel;
			enemyInfo.darkPoint = enemyInfo.darkPointPerLevel * fairyLevel;
			
			let fairyTurnResult = calculateTurn(fairyInfo, enemyInfo);
			let enemyTurnResult = calculateTurn(enemyInfo, fairyInfo);
			
			return {
				fairyLevel : fairyLevel,
				enemyLevel : enemyLevel,
				fairyHP : calculateHP(fairyInfo.hpPoint),
				enemyHP : calculateHP(enemyInfo.hpPoint),
				fairyDamage : fairyTurnResult.damage,
				enemyDamage : enemyTurnResult.damage,
				fairyTurn : fairyTurnResult.turn,
				enemyTurn : enemyTurnResult.turn,
				isWin : fairyTurnResult.turn <= enemyTurnResult.turn
			};
		};
	}
});
