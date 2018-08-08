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
			
			let leftMenu;
			let startButton;
			
			let menuLayout = Yogurt.MenuLayout({
				
				style : {
					color : '#999'
				},
				
				toolbar : Yogurt.Toolbar({
					
					height : 60,
	
					contentStyle : {
						onDisplayResize : (width, height) => {
							
							if (width > Yogurt.Theme.menuLayoutHideMenuWinWidth) {
								return {
									left : Yogurt.Theme.menuLayoutMenuWidth,
									width : BODY.getWidth() - Yogurt.Theme.menuLayoutMenuWidth * 2
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
	
								if (width > Yogurt.Theme.menuLayoutHideMenuWinWidth) {
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
	
								if (width > Yogurt.Theme.menuLayoutHideMenuWinWidth) {
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
								marginTop : -10,
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
	
				leftMenu : leftMenu = DIV({
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
					}), startButton = DIV({
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
							c : MSG('LAYOUT_START_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('start');
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
							c : MSG('LAYOUT_RANKING_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('ranking');
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
						c : '© BTNcafe'
					})]
				})]
			}).appendTo(BODY);
			
			NEXT([
			(next) => {
				
				if (EtherFairy.WalletManager.checkIsLocked() !== true) {
					
					EtherFairy.MasterModel.get(EtherFairy.WalletManager.getWalletAddress(), {
						
						notExists : () => {
							next();
						},
						
						success : () => {
							
							leftMenu.append(DIV({
								style : {
									width : '100%',
									borderBottom : '1px solid #444',
									cursor : 'pointer'
								},
								c : [DIV({
									style : {
										padding : 10,
										fontSize : 15
									},
									c : MSG('LAYOUT_MASTER_MENU')
								}), DIV({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15,
										backgroundColor : '#333'
									},
									c : MSG('BUY_FAIRY'),
									on : {
										tap : () => {
											EtherFairy.GO('master/buyfairy');
											menuLayout.hideLeftMenu();
										}
									}
								}), DIV({
									style : {
										borderTop : '1px solid #222',
										padding : 10,
										paddingLeft : 15,
										fontSize : 15,
										backgroundColor : '#333'
									},
									c : MSG('TRADE_FAIRY'),
									on : {
										tap : () => {
											EtherFairy.GO('master/tradefairy');
											menuLayout.hideLeftMenu();
										}
									}
								}), DIV({
									style : {
										borderTop : '1px solid #222',
										padding : 10,
										paddingLeft : 15,
										fontSize : 15,
										backgroundColor : '#333'
									},
									c : MSG('MANAGE_FAIRY'),
									on : {
										tap : () => {
											EtherFairy.GO('master/managefairy');
											menuLayout.hideLeftMenu();
										}
									}
								})]
							}));
							
							next(true);
						}
					});
				}
				
				else {
					next();
				}
			},
			
			() => {
				return (isMasterSigned) => {
					
					EtherFairy.DesignerModel.checkSigned((signedDesignerData) => {
						
						leftMenu.append(DIV({
							style : {
								width : '100%',
								borderBottom : '1px solid #444',
								cursor : 'pointer'
							},
							c : [DIV({
								style : {
									padding : 10,
									fontSize : 15
								},
								c : MSG('LAYOUT_DESIGNER_MENU')
							}), DIV({
								style : {
									padding : 10,
									paddingLeft : 15,
									fontSize : 15,
									backgroundColor : '#333'
								},
								c : MSG('MANAGE_FAIRY_ORIGIN'),
								on : {
									tap : () => {
										EtherFairy.GO('designer/managefairyorigin');
									}
								}
							}), DIV({
								style : {
									borderTop : '1px solid #222',
									padding : 10,
									paddingLeft : 15,
									fontSize : 15,
									backgroundColor : '#333'
								},
								c : MSG('MANAGE_SALES'),
								on : {
									tap : () => {
										EtherFairy.GO('designer/managesales');
									}
								}
							}), DIV({
								style : {
									borderTop : '1px solid #222',
									padding : 10,
									paddingLeft : 15,
									fontSize : 15,
									backgroundColor : '#333'
								},
								c : MSG('LOGOUT'),
								on : {
									tap : () => {
										EtherFairy.DesignerModel.logout();
									}
								}
							})]
						}));
						
						// 두 종류 모두 로그인한 경우에는 시작하기 버튼 제거
						if (isMasterSigned === true) {
							startButton.remove();
						}
					});
				};
			}]);
			
			inner.on('close', () => {
				menuLayout.remove();
				menuLayoutContent = undefined;
			});
		}
	};
});
