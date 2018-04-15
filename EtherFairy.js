require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'EtherFairy',
		
		title : 'Ether Fairy',
		
		isDevMode : true,
		webServerPort : 8415
	},
	
	BROWSER_CONFIG : {
		Yogurt : {
			toolbarColor : '#222',
			buttonColor : '#222',
			buttonMouseoverColor : '#eee'
		}
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true,
		
		dbName : 'EtherFairy-test'
	}
});
