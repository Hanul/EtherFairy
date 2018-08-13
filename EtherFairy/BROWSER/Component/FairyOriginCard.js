EtherFairy.FairyOriginCard = CLASS({
	
	preset : () => {
		return DIV;
	},
	
	params : () => {
		return {
			style : {
				width : 300,
				backgroundColor : '#fff',
				borderRadius : 6,
				boxShadow : '0 0 8px rgba(0, 0, 0, 0.8)'
			}
		};
	},
	
	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.fairyOriginData
		
		let fairyOriginData = params.fairyOriginData;
		
		self.append(DIV({
			style : {
				position : 'relative',
				height : 400,
				borderRadius : '6px 6px 0 0',
				backgroundImage : EtherFairy.RF(fairyOriginData.imageFileId),
				backgroundSize : 'cover',
				backgroundPosition : 'center center'
			},
			c : DIV({
				style : {
					position : 'absolute',
					left : 10,
					bottom : 10,
					width : 280
				},
				c : [DIV({
					style : {
						flt : 'left',
						backgroundColor : 'rgba(0, 0, 0, 0.5)',
						padding : '3px 6px',
						borderRadius : 3
					},
					c : fairyOriginData.name
				}), CLEAR_BOTH()]
			})
		}));
		
		self.append(DIV({
			style : {
				backgroundColor : '#222',
				padding : 5
			},
			c : [UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/fire.png')
				}),
				spacing : 10,
				title : fairyOriginData.firePointPerLevel
			}), UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/water.png')
				}),
				spacing : 10,
				title : fairyOriginData.waterPointPerLevel
			}), UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/wind.png')
				}),
				spacing : 10,
				title : fairyOriginData.windPointPerLevel
			}), UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/earth.png')
				}),
				spacing : 10,
				title : fairyOriginData.earthPointPerLevel
			}), UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/light.png')
				}),
				spacing : 10,
				title : fairyOriginData.lightPointPerLevel
			}), UUI.BUTTON_H({
				style : {
					width : 130,
					padding : 5,
					flt : 'left'
				},
				icon : IMG({
					style : {
						width : 20
					},
					src : EtherFairy.R('element/dark.png')
				}),
				spacing : 10,
				title : fairyOriginData.darkPointPerLevel
			}), CLEAR_BOTH()]
		}));
	}
});
