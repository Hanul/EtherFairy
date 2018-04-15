EtherFairy.TextShadow = METHOD({

	run : (color) => {
		
		return '1px 1px 0 ' + color + ',' +
			'-1px 1px 0 ' + color + ',' +
			'1px -1px 0 ' + color + ',' +
			'-1px -1px 0 ' + color + ',' +
			'0px 1px 0 ' + color + ',' +
			'0px -1px 0 ' + color + ',' +
			'-1px 0px 0 ' + color + ',' +
			'1px 0px 0 ' + color + ',' +
			'2px 2px 0 ' + color + ',' +
			'-2px 2px 0 ' + color + ',' +
			'2px -2px 0 ' + color + ',' +
			'-2px -2px 0 ' + color + ',' +
			'0px 2px 0 ' + color + ',' +
			'0px -2px 0 ' + color + ',' +
			'-2px 0px 0 ' + color + ',' +
			'2px 0px 0 ' + color + ',' +
			'1px 2px 0 ' + color + ',' +
			'-1px 2px 0 ' + color + ',' +
			'1px -2px 0 ' + color + ',' +
			'-1px -2px 0 ' + color + ',' +
			'2px 1px 0 ' + color + ',' +
			'-2px 1px 0 ' + color + ',' +
			'2px -1px 0 ' + color + ',' +
			'-2px -1px 0 ' + color;
	}
});
