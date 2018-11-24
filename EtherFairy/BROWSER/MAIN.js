EtherFairy.MAIN = METHOD({

	run : (params) => {
		
		// 나눔 명조 폰트 추가
		ADD_FONT({
			name : 'Nanum Myeongjo',
			style : 'normal',
			weight : 400,
			woff2 : EtherFairy.R('font/NanumMyeongjo-Regular.woff2'),
			woff : EtherFairy.R('font/NanumMyeongjo-Regular.woff'),
			ttf : EtherFairy.R('font/NanumMyeongjo-Regular.ttf')
		});
		
		// 폰트 크기로 인해 메뉴가 꼬이는 현상 개선
		FontFaceOnload('Nanum Myeongjo', {
			success : () => {
				EVENT.fireAll('resize');
			},
			glyphs : '\uE600\uE601\uE602\uE605'
		});
		
		BODY.addStyle({
			cursor : 'url(' + EtherFairy.R('cursor.png') + ') 1 2, auto',
			overflowY : 'scroll'
		});
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = 'input[type="range"]::-webkit-slider-thumb { width:30px; height:30px; } * { font-family:\'Nanum Myeongjo\'; -webkit-tap-highlight-color:transparent; } input, textarea { user-select:auto; -webkit-user-select:auto; }';
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
				target : EtherFairy.Master.Home
			});
			
			// 소유주 정보 수정
			EtherFairy.MATCH_VIEW({
				uri : 'master/updateinfo',
				target : EtherFairy.Master.UpdateInfo
			});
			
			// 요정 구매
			EtherFairy.MATCH_VIEW({
				uri : 'master/buyfairy',
				target : EtherFairy.Master.BuyFairy
			});
			
			// 요정 거래
			EtherFairy.MATCH_VIEW({
				uri : 'master/tradefairy',
				target : EtherFairy.Master.TradeFairy
			});
			
			// 요정 거래 시작
			EtherFairy.MATCH_VIEW({
				uri : 'master/starttradefairy',
				target : EtherFairy.Master.StartTradeFairy
			});
			
			// 소유주 랭킹
			EtherFairy.MATCH_VIEW({
				uri : 'master/ranking',
				target : EtherFairy.Master.Ranking
			});
			
			// 소유주 정보
			EtherFairy.MATCH_VIEW({
				uri : 'master/{masterAddress}',
				excludeURI : [
					'master/join',
					'master/buyfairy',
					'master/tradefairy',
					'master/starttradefairy',
					'master/ranking',
					'master/updateinfo'
				],
				target : EtherFairy.Master.Info
			});
			
			// 디자이너로 시작하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'designer/start',
				target : EtherFairy.Designer.Start
			});
			
			// 디자이너로 로그인 화면
			EtherFairy.MATCH_VIEW({
				uri : 'designer/login',
				target : EtherFairy.Designer.Login
			});
			
			// 디자이너로 가입하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'designer/join/{identityCode}',
				target : EtherFairy.Designer.Join
			});
			
			// 디자이너 홈
			EtherFairy.MATCH_VIEW({
				uri : 'designer',
				target : EtherFairy.Designer.Home
			});
			
			// 디자이너 정보 수정
			EtherFairy.MATCH_VIEW({
				uri : 'designer/updateinfo',
				target : EtherFairy.Designer.UpdateInfo
			});
			
			// 페어리 원형 디자인 폼
			EtherFairy.MATCH_VIEW({
				uri : ['designer/designfairy', 'designer/designfairy/{fairyOriginId}'],
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
				uri : 'company',
				target : EtherFairy.Company.ManageService
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'company/createdesigneridentity',
				target : EtherFairy.Company.CreateDesignerIdentity
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'company/designeridentity',
				target : EtherFairy.Company.DesignerIdentity
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'company/managefairyorigin',
				target : EtherFairy.Company.ManageFairyOrigin
			});
		});
	}
});
