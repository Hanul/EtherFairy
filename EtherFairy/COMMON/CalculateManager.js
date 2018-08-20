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
			
			return hpLevel * 20;
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
		
		// 두 요정에 전투를 붙힙니다. (winner가 1이면 첫번째 요정의 승리, 2면 두번째 요정의 승리)
		let battle = self.battle = (params) => {
			//REQUIRED: params
			//REQUIRED: params.fairy1Info
			//REQUIRED: params.fairy1Info.hp
			//REQUIRED: params.fairy1Info.damage
			//REQUIRED: params.fairy1Info.defencePercent
			//REQUIRED: params.fairy1Info.attackSpeed
			//REQUIRED: params.fairy1Info.avoidability
			//REQUIRED: params.fairy1Info.criticalPercent
			//REQUIRED: params.fairy1Info.firePoint
			//REQUIRED: params.fairy1Info.waterPoint
			//REQUIRED: params.fairy1Info.windPoint
			//REQUIRED: params.fairy1Info.earthPoint
			//REQUIRED: params.fairy1Info.lightPoint
			//REQUIRED: params.fairy1Info.darkPoint
			//REQUIRED: params.fairy2Info
			//REQUIRED: params.fairy2Info.hp
			//REQUIRED: params.fairy2Info.damage
			//REQUIRED: params.fairy2Info.defencePercent
			//REQUIRED: params.fairy2Info.attackSpeed
			//REQUIRED: params.fairy2Info.avoidability
			//REQUIRED: params.fairy2Info.criticalPercent
			//REQUIRED: params.fairy2Info.firePoint
			//REQUIRED: params.fairy2Info.waterPoint
			//REQUIRED: params.fairy2Info.windPoint
			//REQUIRED: params.fairy2Info.earthPoint
			//REQUIRED: params.fairy2Info.lightPoint
			//REQUIRED: params.fairy2Info.darkPoint
			
			let fairy1Info = params.fairy1Info;
			let fairy2Info = params.fairy2Info;
			
			
			let fairy1Damage = (fairy1Info.damage
				+ fairy1Info.firePoint
				+ fairy1Info.waterPoint
				+ fairy1Info.windPoint
				+ fairy1Info.earthPoint
				+ fairy1Info.lightPoint
				+ fairy1Info.darkPoint
			) * (100 - fairy2Info.defencePercent) / 100; // 여기에 속성값을 곱해야 함
			
			let fairy1AttackCount = fairy1Info.attackSpeed / 60 * (100 - fairy2Info.avoidability) / 100;
			
			let fairy1BonusDamage = fairy1Damage * fairy2Info.criticalPercent / 100 * 10;
			
			let fairy1Turn = fairy2Info.hp / (fairy1Damage + fairy1BonusDamage) * fairy1AttackCount;
			
			
			let fairy2Damage = (fairy2Info.damage
				+ fairy2Info.firePoint
				+ fairy2Info.waterPoint
				+ fairy2Info.windPoint
				+ fairy2Info.earthPoint
				+ fairy2Info.lightPoint
				+ fairy2Info.darkPoint
			) * (100 - fairy1Info.defencePercent) / 100; // 여기에 속성값을 곱해야 함
			
			let fairy2AttackCount = fairy2Info.attackSpeed / 60 * (100 - fairy1Info.avoidability) / 100;
			
			let fairy2BonusDamage = fairy2Damage * fairy1Info.criticalPercent / 100 * 10;
			
			let fairy2Turn = fairy1Info.hp / (fairy2Damage + fairy2BonusDamage) * fairy2AttackCount;
			
			
			if (fairy1Turn <= fairy2Turn) {
				return 1;
			} else {
				return 2;
			}
		};
	}
});
