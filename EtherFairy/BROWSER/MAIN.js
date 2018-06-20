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
		
		let style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = 'input[type="range"]::-webkit-slider-thumb { width:30px; height:30px; } * { font-family:\'Nanum Myeongjo\'; -webkit-tap-highlight-color:transparent; }';
		document.getElementsByTagName('head')[0].appendChild(style);
		
		// 텍스트 번역을 위한 데이터
		MSG.loadCSV(EtherFairy.R('text.csv'), () => {
			
			TITLE(MSG('TITLE'));
			
			EtherFairy.MATCH_VIEW({
				uri : '**',
				target : EtherFairy.Layout
			});
			
			EtherFairy.MATCH_VIEW({
				uri : '',
				target : EtherFairy.Home
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'intro',
				target : EtherFairy.Intro
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'start',
				target : EtherFairy.Start
			});
			
			EtherFairy.MATCH_VIEW({
				uri : 'ranking',
				target : EtherFairy.Ranking
			});
			
			// 소유주로 가입하기 화면
			EtherFairy.MATCH_VIEW({
				uri : 'owner/join',
				target : EtherFairy.Owner.Join
			});
			
			// 소유주 홈
			EtherFairy.MATCH_VIEW({
				uri : 'owner',
				target : EtherFairy.OwnerHome
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
		});
	}
});
