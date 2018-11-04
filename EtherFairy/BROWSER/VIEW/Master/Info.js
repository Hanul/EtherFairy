EtherFairy('Master').Info = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : '50px 0'
			},
			c : 'test'
		}));
	}
});
