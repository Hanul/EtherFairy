require(process.env.UPPERCASE_PATH + '/LOAD.js');

BOOT({
	CONFIG : {
		defaultBoxName : 'EtherFairy',
		
		title : 'Ether Fairy',
		
		isDevMode : true,
		webServerPort : 8415
	},
	
	NODE_CONFIG : {
		// 테스트 목적이기 때문에 CPU 클러스터링 기능을 사용하지 않습니다.
		isNotUsingCPUClustering : true,
		
		dbName : 'EtherFairy-test',
		
		GoogleSheetsSync : {
			'EtherFairy/R/text.csv' : 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR5IG9gFmXavJX0O_0DKjqeP2yeDrsEL3lvHZP1OVUphApBo7RY-Ehf2tmraiu0EAXJZaVV5gX_G_z4/pub?output=csv'
		}
	}
});
