EtherFairy.Home = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		TITLE(MSG('TITLE'));
		
		let tokenInfoPanel;
		let newsPanel;
		let contactPanel;
		EtherFairy.Layout.setContent(DIV({
			style : {
				width : 1010,
				padding : 10,
				margin : 'auto'
			},
			c : [
			
			P({
				c : MSG('INTRODUCE')
			}),
			
			DIV({
				style : {
					width : 500,
					flt : 'left'
				},
				c : [H3({
					c : MSG('THEME_SONG')
				}), IFRAME({
					style : {
						width : '100%',
						height : 300
					},
					src : 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/307043740&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
				})]
			}),
			
			DIV({
				style : {
					marginLeft : 10,
					width : 500,
					flt : 'left'
				},
				c : [H3({
					c : MSG('NEWS')
				}), newsPanel = DIV({
					style : {
						width : '100%',
						height : 300
					}
				})]
			}),
			
			CLEAR_BOTH(),
			
			tokenInfoPanel = DIV(),
			
			contactPanel = DIV({
				c : MSG('CONTACT')
			})]
		}));
		
		newsPanel.getEl().innerHTML = '<div class="fb-page" data-href="https://www.facebook.com/etherfairy/" data-tabs="timeline" data-width="' + newsPanel.getWidth() + '" data-height="' + newsPanel.getHeight() + '" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/etherfairy/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/etherfairy/">Ether Fairy</a></blockquote></div>';
		
		/*if (EtherFairy.WalletManager.checkIsEnable() === true) {
			
			// 토큰 정보 표시
			EtherFairy.EtherFairyContractController.name((name) => {
				tokenInfoPanel.append(P({
					c : MSG('TOKEN_NAME') + ' : ' + name
				}));
				
				EtherFairy.EtherFairyContractController.symbol((symbol) => {
					tokenInfoPanel.append(P({
						c : MSG('TOKEN_SYMBOL') + ' : ' + symbol
					}));
				});
			});
		}*/
	}
});
