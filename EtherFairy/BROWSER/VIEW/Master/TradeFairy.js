EtherFairy('Master').TradeFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			A({
				c : MSG('START_TRADE_FAIRY'),
				on : {
					tap : () => {
						EtherFairy.GO('master/starttradefairy');
					}
				}
			}),
			
			P({
				c : 'test'
			})]
		}));
	}
});
