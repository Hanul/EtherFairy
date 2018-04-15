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
		MSG.addData({
			
			LAYOUT_HOME_BUTTON : {
				ko : '처음으로'
			},
			LAYOUT_LOGIN_BUTTON : {
				ko : '로그인'
			},
			
			INTRO_TITLE : {
				ko : 'Ether Fairy 백서'
			},
			INTRO_DESCRIPTION : {
				ko : 'Ether Fairy는 이더리움 네트워크에서 구동되는 카드형 RPG DApp이다. 그동안 출시된 이더리움 기반 게임들과는, 요정을 소유하고만 있어도 가치가 계속해서 올라간다는 점에서 차별점이 있다. 비록 토큰 발행이나 ICO를 진행하지는 않지만, DApp 기반 게임 자체가 드물기 때문에 유저들의 이해도를 높이고, 앞으로의 계획을 밝히는 백서를 작성한다.'
			},
			INTRO_SUB_TITLE_1 : {
				ko : '명칭 설명'
			},
			INTRO_PARAGRAPH_1_SUB_TITLE_1 : {
				ko : 'etherfairy.com'
			},
			INTRO_PARAGRAPH_1_SUB_1 : {
				ko : 'Ether Fairy가 서비스되는 사이트의 주소이다. 유저가 가입하면, 메타마스크를 통해 지갑을 인증하고 소유주 이름을 지정할 수 있다. 소유주 이름은 언제든지 변경가능하다.'
			},
			INTRO_PARAGRAPH_1_SUB_TITLE_2 : {
				ko : '요정'
			},
			INTRO_PARAGRAPH_1_SUB_2 : {
				ko : 'Ether Fairy의 거래 품목이다. 각 요정들은 저마다 고유의 일러스트 이미지가 있으며, 각자 능력이 모두 다르다. 소유한 후에는 스스로 성장하며, 성장한 요정들은 유저 간에 거래가 가능하다.'
			},
			INTRO_PARAGRAPH_1_SUB_TITLE_3 : {
				ko : 'Fairy Root'
			},
			INTRO_PARAGRAPH_1_SUB_3 : {
				ko : '스마트 계약을 작성하고 etherfairy.com을 유지보수하는 관리자 그룹이다. 매주 새로운 5종류의 요정을 탄생시키고 판매한다.'
			},
			INTRO_SUB_TITLE_2 : {
				ko : '요정의 탄생'
			},
			INTRO_PARAGRAPH_2 : {
				ko : '매주 5종류의 새로운 요정이 탄생한다. 이 5종류의 새로운 요정은 오직 1주일 동안에만 Fairy Root로부터 판매되며, 이후에는 오로지 해당 요정을 소유한 소유주들로부터만 구매할 수 있다. 따라서 초기 판매 1주일이 지난 후부터는 요정들에게 희소성이 반영된다.'
			},
			INTRO_SUB_TITLE_3 : {
				ko : '요정의 속성'
			},
			INTRO_PARAGRAPH_3_SUB_TITLE_1 : {
				ko : '기본 속성'
			},
			INTRO_PARAGRAPH_3_SUB_1 : {
				ko : '요정은 기본적으로 체력, 공격력, 방어력과 민첩, 회피 속성을 지니고 있다. 민첩과 회피는 서로 상쇄되는 효과를 가지고 있다.'
			},
			INTRO_PARAGRAPH_3_SUB_TITLE_2 : {
				ko : '상성 속성'
			},
			INTRO_PARAGRAPH_3_SUB_2 : {
				ko : '요정은 기본 속성 외에 불, 물, 바람, 대지, 빛, 어둠의 6가지 속성을 지니고 있다. 이 6가지 속성은 서로 상성이 존재하는데, 불은 빛과 바람보다 강하고, 바람은 빛과 대지보다, 대지는 빛과 물보다 강하다. 물은 불과 빛보다 강하다. 어둠은 불과 바람, 대지와 물보다 강한데, 마지막으로 빛은 어둠보다 강하다. 정리하자면 다음과 같은 이미지로 표현할 수 있다. 모두에게 강한 어둠과, 모두에게 약하지만 어둠보다는 강한 빛의 존재로 인해 요정들의 속성이 매우 다채로워진다.'
			},
			INTRO_SUB_TITLE_4 : {
				ko : '요정 구매'
			},
			INTRO_PARAGRAPH_4_1 : {
				ko : '유저들은 요정을 Fairy Market에서 구매할 수 있다. Fairy Market에는 Fairy Root로부터 올라온 신규 요정 5종류와, 유저들이 성장시킨 요정들을 올려 다른 유저들에게 판매할 수 있다.'
			},
			INTRO_PARAGRAPH_4_2 : {
				ko : 'Fairy Root로부터 탄생한 신규 요정은 모두 0.01이더(3월 현재 한화 가치 6천원 가량)로 가격이 동일하다. 그러나 유저들이 판매하는 요정의 가격은 판매자가 정한다. 얼마나 성장시켰는지, 얼마나 희소한지의 여부로 유저들끼리 가치를 매기는 방식이다.'
			},
			INTRO_SUB_TITLE_5 : {
				ko : '요정의 성장'
			},
			INTRO_PARAGRAPH_5_1 : {
				ko : '구매한 요정은 초기 판매 기간 동안에는 씨앗 상태로 잠들어 있으며, 초기 판매 기간이 지난 이후부터는 다른 요정들과 전투를 벌이며 자동으로 성장한다. 요정들이 스스로 성장하기 때문에, 요정의 소유주들은 요정들을 소유하고만 있어도 시간이 지남에 따라 요정들의 가치가 오르는 것을 확인할 수 있다. 각 요정들은 고유한 키 값에 따라 정해진 알고리즘으로 성장하며, 구매 당시에는 해당 요정이 어떻게 성장할지 아무도 모른다. 그러나 구매한 후 부터 성장하는 과정을 살펴보면서, 해당 요정의 성장 능력을 확인할 수 있게 된다.'
			},
			INTRO_PARAGRAPH_5_2 : {
				ko : '요정의 소유주는 요정의 성장을 가속시킬 수 있는데, 마치 식물에게 물을 주듯 요정에게 생명수를 먹이면 된다. 생명수는 소액의 이더로 구매할 수 있는데, 일반적인 RPG 게임에서의 경험치 획득 가속 아이템과 그 역할이 동일하다.'
			},
			INTRO_PARAGRAPH_5_3 : {
				ko : '요정이 너무 많이 성장하여 비슷한 수준의 요정이 더 이상 없다면, 전투를 벌일 비슷한 수준의 요정을 검색하는 데에 오랜 시간이 걸릴 것이며 이는 한 요정의 급격한 능력치 인플레이션을 막는 제동장치가 된다.'
			},
			INTRO_SUB_TITLE_6 : {
				ko : '요정의 판매'
			},
			INTRO_PARAGRAPH_6 : {
				ko : '성장한 요정은 Fairy Market에 등록하여 다른 유저들에게 판매할 수 있는데, 여기서 가격은 판매자가 직접 지정한다. 판매자는 요정이 Fairy Market에 등록한 상태에서는 성장하지 않는다는 점에 주의해야 한다.'
			},
			INTRO_SUB_TITLE_7 : {
				ko : '랭킹'
			},
			INTRO_PARAGRAPH_7 : {
				ko : '요정들의 레벨이나 능력치 별로 랭킹을 매길 수 있으며, 하트(페이스북의 좋아요와 같은 개념)로도 랭킹이 매겨진다. 하트 또한 요정들의 매력도를 확인할 수 있는 주요 지표이기 때문에, 가치 판단에서 중요하다. 또한 소유주 랭킹이 존재하는데, 가지고 있는 요정 수 및 요정들의 레벨의 총합 등으로 랭킹을 매긴다.'
			},
			INTRO_SUB_TITLE_8 : {
				ko : 'Fairy Root의 역할'
			},
			INTRO_PARAGRAPH_8 : {
				ko : '비로 요정의 소유 정보는 이더리움 네트워크에 저장될 예정이나, 요정들의 성장을 자동화하여 처리하는 데 서버가 필요하고, 웹 페이지나 이미지 자원을 제공하는 데에도 필요하다. Fairy Root는 이런 서버 자원을 관리하고, 유저들의 피드백을 받아 처리하는 역할을 진행한다.'
			},
			INTRO_SUB_TITLE_9 : {
				ko : '서비스 계획'
			},
			INTRO_PARAGRAPH_9 : {
				ko : 'etherfairy.com에는 영어와 일본어, 중국어(번체)가 지원될 예정이며, 한국어 서비스의 경우 추후 게임 등급 심사가 완료된 후 개시할 예정이다. 한국어 서비스가 개시되더라도 Fairy Root 서버가 분리되지는 않는다. Fairy Root 서버는 글로벌 통합 서버이다.'
			},
			INTRO_SUB_TITLE_10 : {
				ko : '개발자 소개'
			},
			INTRO_PARAGRAPH_10 : {
				ko : 'Ether Fairy의 개발자는 심영재이며, 6년차 모바일 게임 개발사 BTNcafe를 운영하고 있다. BTNcafe의 게임들을 모두 직접 개발하였으며, 이더리움 네트워크에 큰 관심을 가지고 있고 게임에 접목시키기 위한 다양한 방법을 모색하고 있다. Ether Fairy는 그러한 연구의 첫 결과물이다.'
			},
			
			LOGIN_TITLE : {
				ko : 'Ether Fairy 로그인'
			},
			LOGIN_DESCRIPTION : {
				ko : '메타마스크를 이용해 로그인합니다.'
			},
			LOGIN_BUTTON : {
				ko : '로그인'
			},
			PLEASE_INSTALL_METAMASK : {
				ko : '메타마스크를 설치해주시기 바랍니다.'
			},
			INSTALL_METAMASK_BUTTON : {
				ko : '메타마스크 설치하기'
			}
		});
		
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
			uri : 'game',
			target : EtherFairy.Game
		});
		
		EtherFairy.MATCH_VIEW({
			uri : 'login',
			target : EtherFairy.Login
		});
	}
});