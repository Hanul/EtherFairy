EtherFairy('Owner').ManageFairy = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			P({
				c : 'test'
			})]
		}));
	}
});
