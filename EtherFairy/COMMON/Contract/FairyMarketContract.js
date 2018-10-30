EtherFairy.FairyMarketContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":true,"inputs":[{"name":"fairyId","type":"uint256"}],"name":"findSaleIdByFairyId","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"marketPaused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nft","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"company","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"fairyId","type":"uint256"}],"name":"checkFairyForSale","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeMarket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseMarket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"sales","outputs":[{"name":"seller","type":"address"},{"name":"fairyId","type":"uint256"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fairyId","type":"uint256"}],"name":"cancelSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getSaleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"fairyId","type":"uint256"}],"name":"buy","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newCompany","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"fairyId","type":"uint256"},{"name":"price","type":"uint256"}],"name":"startSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNFTAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fairyId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"StartSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fairyId","type":"uint256"}],"name":"CancelSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"fairyId","type":"uint256"},{"indexed":false,"name":"price","type":"uint256"}],"name":"SuccessSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"oldCompany","type":"address"},{"indexed":false,"name":"newCompany","type":"address"}],"name":"TransferOwnership","type":"event"},{"anonymous":false,"inputs":[],"name":"PauseMarket","type":"event"},{"anonymous":false,"inputs":[],"name":"ResumeMarket","type":"event"}],
			
			address : CONFIG.isDevMode !== true ?
			
			// 운영 모드
			'' :
			
			// 개발 모드
			// Kovan
			'0x52a08be93b102222a9b130fe82aab340a728688d'
		};
	}
});