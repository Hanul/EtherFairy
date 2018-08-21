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
		
		// HP Level로부터 HP를 계산합니다.
		let calculateHP = self.calculateHP = (hpLevel) => {
			//REQUIRED: hpLevel
			
			return hpLevel * 100;
		};
		
		// Attack Level로부터 공격력을 계산합니다.
		let calculateDamage = self.calculateDamage = (attackLevel) => {
			//REQUIRED: attackLevel
			
			return attackLevel * 5;
		};
		
		// Defence Level로부터 방어력을 계산합니다.
		let calculateDefencePercent = self.calculateDefencePercent = (defenceLevel) => {
			//REQUIRED: defenceLevel
			
			return parseFloat((Math.log10(defenceLevel * defenceLevel) * Math.log10(defenceLevel * defenceLevel)).toFixed(2));
		};
		
		// Agility Level로부터 공격 속도를 계산합니다.
		let calculateAttackSpeed = self.calculateAttackSpeed = (agilityLevel) => {
			//REQUIRED: agilityLevel
			
			return 100 + agilityLevel / 2;
		};
		
		// Dexterity Level로부터 회피율를 계산합니다.
		let calculateAvoidability = self.calculateAvoidability = (dexterityLevel) => {
			//REQUIRED: dexterityLevel
			
			dexterityLevel += 1;
			
			return parseFloat((Math.log10(dexterityLevel * dexterityLevel) * Math.log10(dexterityLevel * dexterityLevel) / 2).toFixed(2));
		};
		
		// Dexterity Level로부터 치명타 확률을 계산합니다.
		let calculateCriticalPercent = self.calculateCriticalPercent = (dexterityLevel) => {
			//REQUIRED: dexterityLevel
			
			dexterityLevel += 1;
			
			return parseFloat((Math.log10(dexterityLevel * dexterityLevel) * Math.log10(dexterityLevel * dexterityLevel) / 2).toFixed(2));
		};
		
		let calculateRuneDamagePercent = (type, targetType) => {
			
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
		
		let calculateRuneAppendDamagePercent = (fairyData, enemyData) => {
			//REQUIRED: fairyData
			//REQUIRED: fairyData.firePoint
			//REQUIRED: fairyData.waterPoint
			//REQUIRED: fairyData.windPoint
			//REQUIRED: fairyData.earthPoint
			//REQUIRED: fairyData.lightPoint
			//REQUIRED: fairyData.darkPoint
			//REQUIRED: enemyData
			//REQUIRED: enemyData.firePoint
			//REQUIRED: enemyData.waterPoint
			//REQUIRED: enemyData.windPoint
			//REQUIRED: enemyData.earthPoint
			//REQUIRED: enemyData.lightPoint
			//REQUIRED: enemyData.darkPoint
			
			let appendDamagePercent = 0;
			
			if (fairyData.firePoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('fire', 'dark');
				}
			}
			
			if (fairyData.waterPoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('water', 'dark');
				}
			}
			
			if (fairyData.windPoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('wind', 'dark');
				}
			}
			
			if (fairyData.earthPoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('earth', 'dark');
				}
			}
			
			if (fairyData.lightPoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('light', 'dark');
				}
			}
			
			if (fairyData.darkPoint > 0) {
				if (enemyData.firePoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'fire');
				}
				if (enemyData.waterPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'water');
				}
				if (enemyData.windPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'wind');
				}
				if (enemyData.earthPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'earth');
				}
				if (enemyData.lightPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'light');
				}
				if (enemyData.darkPoint > 0) {
					appendDamagePercent += calculateRuneDamagePercent('dark', 'dark');
				}
			}
			
			return appendDamagePercent;
		};
		
		let calculateTurn = (fairyData, enemyData) => {
			//REQUIRED: fairyData
			//REQUIRED: fairyData.hpLevel
			//REQUIRED: fairyData.attackLevel
			//REQUIRED: fairyData.defenceLevel
			//REQUIRED: fairyData.strengthLevel
			//REQUIRED: fairyData.agilityLevel
			//REQUIRED: fairyData.dexterityLevel
			//REQUIRED: fairyData.firePoint
			//REQUIRED: fairyData.waterPoint
			//REQUIRED: fairyData.windPoint
			//REQUIRED: fairyData.earthPoint
			//REQUIRED: fairyData.lightPoint
			//REQUIRED: fairyData.darkPoint
			//REQUIRED: enemyData
			//REQUIRED: enemyData.hpLevel
			//REQUIRED: enemyData.attackLevel
			//REQUIRED: enemyData.defenceLevel
			//REQUIRED: enemyData.strengthLevel
			//REQUIRED: enemyData.agilityLevel
			//REQUIRED: enemyData.dexterityLevel
			//REQUIRED: enemyData.firePoint
			//REQUIRED: enemyData.waterPoint
			//REQUIRED: enemyData.windPoint
			//REQUIRED: enemyData.earthPoint
			//REQUIRED: enemyData.lightPoint
			//REQUIRED: enemyData.darkPoint
			
			// 데미지 계산
			let damage = (calculateDamage(fairyData.attackLevel)
				+ calculateRuneDamage(fairyData.firePoint)
				+ calculateRuneDamage(fairyData.waterPoint)
				+ calculateRuneDamage(fairyData.windPoint)
				+ calculateRuneDamage(fairyData.earthPoint)
				+ calculateRuneDamage(fairyData.lightPoint)
				+ calculateRuneDamage(fairyData.darkPoint)
			) * (100 - calculateDefencePercent(enemyData.defenceLevel)) / 100 * (1 + calculateRuneAppendDamagePercent(fairyData, enemyData) / 100);
			
			// 공격 횟수 계산
			let attackCount = calculateAttackSpeed(fairyData.agilityLevel) / 60 * (100 - calculateAvoidability(enemyData.dexterityLevel)) / 100;
			
			let bonusDamage = damage * calculateCriticalPercent(fairyData.dexterityLevel) / 100 * 10;
			
			return calculateHP(enemyData.hpLevel) / (damage + bonusDamage) * attackCount;
		};
		
		// 두 요정에 전투를 붙힙니다. (winner가 1이면 첫번째 요정의 승리, 2면 두번째 요정의 승리)
		let battle = self.battle = (params) => {
			//REQUIRED: params
			//REQUIRED: params.fairyData
			//REQUIRED: params.fairyData.hpLevel
			//REQUIRED: params.fairyData.attackLevel
			//REQUIRED: params.fairyData.defenceLevel
			//REQUIRED: params.fairyData.strengthLevel
			//REQUIRED: params.fairyData.agilityLevel
			//REQUIRED: params.fairyData.dexterityLevel
			//REQUIRED: params.fairyData.firePoint
			//REQUIRED: params.fairyData.waterPoint
			//REQUIRED: params.fairyData.windPoint
			//REQUIRED: params.fairyData.earthPoint
			//REQUIRED: params.fairyData.lightPoint
			//REQUIRED: params.fairyData.darkPoint
			//REQUIRED: params.enemyData
			//REQUIRED: params.enemyData.hpLevel
			//REQUIRED: params.enemyData.attackLevel
			//REQUIRED: params.enemyData.defenceLevel
			//REQUIRED: params.enemyData.strengthLevel
			//REQUIRED: params.enemyData.agilityLevel
			//REQUIRED: params.enemyData.dexterityLevel
			//REQUIRED: params.enemyData.firePoint
			//REQUIRED: params.enemyData.waterPoint
			//REQUIRED: params.enemyData.windPoint
			//REQUIRED: params.enemyData.earthPoint
			//REQUIRED: params.enemyData.lightPoint
			//REQUIRED: params.enemyData.darkPoint
			
			let fairyData = params.fairyData;
			let enemyData = params.enemyData;
			
			console.log(calculateTurn(fairyData, enemyData), calculateTurn(enemyData, fairyData));
			
			return calculateTurn(fairyData, enemyData) <= calculateTurn(enemyData, fairyData);
		};
	}
});
