EtherFairy.Layout = CLASS((cls) => {
	
	let menuLayoutContent;
	
	let setContent = cls.setContent = (content) => {
		menuLayoutContent.empty();
		menuLayoutContent.append(content);
	};
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner, self) => {
			
			let menuLayout = Yogurt.MenuLayout({
				
				style : {
					color : '#999'
				},
				
				toolbar : Yogurt.Toolbar({
					
					height : 60,
	
					contentStyle : {
						onDisplayResize : (width, height) => {
							
							if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
								return {
									left : Yogurt.MenuLayout.getMenuWidth(),
									width : BODY.getWidth() - Yogurt.MenuLayout.getMenuWidth() * 2
								};
							} else {
								return {
									left : 0,
									width : '100%'
								};
							}
						}
					},
					
					// left
					left : Yogurt.ToolbarButton({
						style : {
							marginTop : 6,
							color : '#999',
							onDisplayResize : (width, height) => {
	
								if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
									return {
										display : 'none'
									};
								} else {
									return {
										display : 'block'
									};
								}
							}
						},
						icon : FontAwesome.GetIcon('bars'),
						on : {
							tap : (e) => {
								menuLayout.toggleLeftMenu();
							}
						}
					}),
	
					// right
					right : Yogurt.ToolbarButton({
						style : {
							marginTop : 6,
							color : '#999',
							onDisplayResize : (width, height) => {
	
								if (width > Yogurt.MenuLayout.getHideMenuWinWidth()) {
									return {
										display : 'none'
									};
								} else {
									return {
										display : 'block'
									};
								}
							}
						},
						icon : FontAwesome.GetIcon('users'),
						on : {
							tap : (e) => {
								menuLayout.toggleRightMenu();
							}
						}
					}),
	
					// title
					title : A({
						c : IMG({
							style : {
								marginTop : -30,
								width : 192
							},
							src : EtherFairy.R('logo.png')
						}),
						on : {
							tap : () => {
								EtherFairy.GO('');
							}
						}
					})
				}),
	
				leftMenu : DIV({
					c : [DIV({
						style : {
							width : '100%',
							borderBottom : '1px solid #333',
							cursor : 'pointer'
						},
						c : [DIV({
							style : {
								padding : 10,
								fontSize : 15
							},
							c : MSG('LAYOUT_HOME_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('');
								menuLayout.hideLeftMenu();
							}
						}
					}), DIV({
						style : {
							width : '100%',
							borderBottom : '1px solid #333',
							cursor : 'pointer'
						},
						c : [DIV({
							style : {
								padding : 10,
								fontSize : 15
							},
							c : MSG('LAYOUT_LOGIN_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('login');
								menuLayout.hideLeftMenu();
							}
						}
					})]
				}),
	
				rightMenu : DIV({
					style : {
						paddingBottom : 20
					}
				}),
	
				c : [Yogurt.Wrapper({
					style : {
						backgroundColor : '#333',
						color : '#fff'
					},
					c : [
	
					// content
					menuLayoutContent = DIV({
						style : {
							padding : 20
						}
					}),
					
					// footer
					DIV({
						style : {
							backgroundColor : '#222',
							color : '#999',
							padding : '20px'
						},
						c : '© Fairy Root'
					})]
				})]
			}).appendTo(BODY);
			
			inner.on('close', () => {
				menuLayout.remove();
				menuLayoutContent = undefined;
			});
		}
	};
});
