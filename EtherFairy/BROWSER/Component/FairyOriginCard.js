EtherFairy.FairyOriginCard = CLASS({
	
	preset : () => {
		return DIV;
	},
	
	params : () => {
		return {
			style : {
				position : 'relative',
				width : 360,
				height : 550,
				backgroundImage : EtherFairy.R('origincard.png'),
				boxShadow : '0 0 8px rgba(0, 0, 0, 0.8)',
				onDisplayResize : (width, height) => {
					if (width < 1300) {
						return {
							transform : 'scale(0.5)'
						};
					} else {
						return {
							transform : undefined
						};
					}
				}
			}
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.fairyOriginData
		
		let fairyOriginData = params.fairyOriginData;
		
		// 요정 이미지
		self.append(DIV({
			style : {
				position : 'absolute',
				left : 10,
				top : 43,
				width : 339,
				height : 399,
				borderRadius : 6,
				backgroundImage : EtherFairy.RF(fairyOriginData.imageFileId),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			}
		}));
		
		// 속성값 표시
		self.append(DIV({
			style : {
				position : 'absolute',
				left : 16,
				bottom : 52
			},
			c : [UUI.V_CENTER({
				style : {
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/fire.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.firePointPerLevel
			}), UUI.V_CENTER({
				style : {
					marginLeft : 3,
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/water.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.waterPointPerLevel
			}), UUI.V_CENTER({
				style : {
					marginLeft : 3,
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/wind.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.windPointPerLevel
			}), UUI.V_CENTER({
				style : {
					marginLeft : 3,
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/earth.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.earthPointPerLevel
			}), UUI.V_CENTER({
				style : {
					marginLeft : 3,
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/light.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.lightPointPerLevel
			}), UUI.V_CENTER({
				style : {
					marginLeft : 3,
					flt : 'left',
					width : 52,
					height : 52,
					backgroundImage : EtherFairy.R('element/dark.png'),
					color : '#fff5ef',
					textShadow : EtherFairy.TextBorderShadow('#1d0e08'),
					textAlign : 'center',
					fontSize : 20
				},
				c : fairyOriginData.darkPointPerLevel
			}), CLEAR_BOTH()]
		}));
		
		// 요정 원본 이름
		self.append(DIV({
			style : {
				position : 'absolute',
				left : 10,
				bottom : 10,
				width : 326,
				padding : 7,
				textAlign : 'center',
				color : '#fff2ec',
				textShadow : EtherFairy.TextBorderShadow('#180b00')
			},
			c : '[' + fairyOriginData.name + ']'
		}));
	}
});
