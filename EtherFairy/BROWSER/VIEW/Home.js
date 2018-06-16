EtherFairy.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		EtherFairy.GO('intro');
	}
});
