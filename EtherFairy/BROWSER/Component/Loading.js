EtherFairy.Loading = CLASS({
	
	preset : () => {
		return UUI.LOADING;
	},
	
	params : () => {
		return {
			style : {
				width : '100%',
				height : '100%',
				backgroundColor : 'rgba(0, 0, 0, 0.5)'
			},
			contentStyle : {
				height : '100%'
			},
			indicator : IMG({
				src : EtherFairy.R('loading.png')
			})
		};
	}
});
