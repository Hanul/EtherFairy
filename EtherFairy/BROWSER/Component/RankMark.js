EtherFairy.RankMark = CLASS({
	
	preset : () => {
		return DIV;
	},
	
	params : () => {
		return {
			style : {
				width : 66,
				height : 66,
				textAlign : 'center'
			}
		};
	},
	
	init : (inner, self, rating) => {
		//REQUIRED: rating
		
		let markLevel = INTEGER(rating / 300) + 1;
		if (markLevel > 6) {
			markLevel = 6;
		}
		
		let markGrade = INTEGER(rating % 300 / 100) + 1;
		
		// 랭킹 확인
		EtherFairy.FairyModel.count({
			filter : {
				rating : {
					$gt : rating
				}
			}
		}, (count) => {
			
			// 랭킹 1등
			if (count === 0) {
				markLevel = 10;
			}
			
			// 랭킹 10등
			else if (count < 10) {
				markLevel = 9;
			}
			
			// 랭킹 100등
			else if (count < 100) {
				markLevel = 8;
			}
			
			// 랭킹 1000등
			else if (count < 1000) {
				markLevel = 7;
			}
			
			self.addStyle({
				backgroundImage : EtherFairy.R('rank/' + markLevel + '.png')
			});
			
			self.append(markLevel > 6 ? '' : IMG({
				style : {
					marginTop : 5
				},
				src : EtherFairy.R('rank/' + RUN(() => {
					let markGradeStr = '';
					REPEAT(markGrade, () => {
						markGradeStr += 'i';
					});
					return markGradeStr;
				}) + '.png')
			}));
		});
	}
});
