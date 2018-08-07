EtherFairy.MAIN = METHOD({

	run : (params) => {
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css); input[type="range"]::-webkit-slider-thumb { width:30px; height:30px; } * { font-family:\'Noto Sans KR\'; -webkit-tap-highlight-color:transparent; }';
		document.getElementsByTagName('head')[0].appendChild(style);
		
		// 페이스북 SDK 로드
		DIV().getEl().id = 'fb-root';
		
		(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.1&appId=1614859782072527&autoLogAppEvents=1';
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		// 텍스트 번역을 위한 데이터
		MSG.loadCSV(EtherFairy.R('text.csv'), () => {
			
			EtherFairy.MATCH_VIEW({
				uri : '**',
				target : EtherFairy.Layout
			});
			
			EtherFairy.MATCH_VIEW({
				uri : '',
				target : EtherFairy.Home
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'oldintro',
				target : EtherFairy.OldIntro
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'start',
				target : EtherFairy.Start
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'ranking',
				target : EtherFairy.Ranking
			});
			
			// 요정 정보 보기
			EtherFairy.MATCH_VIEW({
				uri : 'fairy/{fairyId}',
				target : EtherFairy.Fairy
			});
			
			// 소유주로 가입하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'master/join',
				target : EtherFairy.Master.Join
			});
			
			// 소유주 홈
			EtherFairy.MATCH_VIEW({
				uri : 'master',
				target : EtherFairy.MasterHome
			});
			
			// 요정 구매
			EtherFairy.MATCH_VIEW({
				uri : 'master/buyfairy',
				target : EtherFairy.Master.BuyFairy
			});
			
			// 요정 관리
			EtherFairy.MATCH_VIEW({
				uri : 'master/managefairy',
				target : EtherFairy.Master.ManageFairy
			});
			
			// 요정 거래
			EtherFairy.MATCH_VIEW({
				uri : 'master/tradefairy',
				target : EtherFairy.Master.TradeFairy
			});
			
			// 디자이너로 시작하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'designer/start',
				target : EtherFairy.Designer.Start
			});
			
			// 디자이너로 가입하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'designer/join',
				target : EtherFairy.Designer.Join
			});
			
			// 디자이너 홈
			EtherFairy.MATCH_VIEW({
				uri : 'designer',
				target : EtherFairy.DesignerHome
			});
			
			// 페어리 원형 디자인 폼
			EtherFairy.MATCH_VIEW({
				uri : 'designer/designfairy',
				target : EtherFairy.Designer.DesignFairy
			});
			
			// 페어리 원형 관리 폼
			EtherFairy.MATCH_VIEW({
				uri : 'designer/managefairyorigin',
				target : EtherFairy.Designer.ManageFairyOrigin
			});
			
			// 페어리 원형 정보 보기
			EtherFairy.MATCH_VIEW({
				uri : 'fairyorigin/{fairyOriginId}',
				target : EtherFairy.FairyOrigin
			});
			
			// 서비스 관리 페이지
			EtherFairy.MATCH_VIEW({
				uri : 'company/manageservice',
				target : EtherFairy.Company.ManageService
			});
		});
	}
});
