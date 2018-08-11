EtherFairy.Layout = CLASS((cls) => {
	
	let menuLayoutContent;
	let processList;
	
	let setContent = cls.setContent = (content) => {
		menuLayoutContent.empty();
		menuLayoutContent.append(content);
	};
	
	let addRunningProcess = cls.addRunningProcess = (title) => {
		return EtherFairy.RunningProcessItem(title).appendTo(processList);
	};
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner, self) => {
			
			let leftMenu;
			let startButton;
			let bgmList;
			
			let menuLayout = Yogurt.MenuLayout({
				
				style : {
					color : '#999'
				},
				
				toolbar : Yogurt.Toolbar({
					
					height : 70,
	
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
								marginTop : -5,
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
						c : [UUI.BUTTON_H({
							style : {
								padding : 10,
								fontSize : 15
							},
							icon : SPAN({
								style : {
									width : 12
								},
								c : FontAwesome.GetIcon('home')
							}),
							spacing : 10,
							title : MSG('LAYOUT_HOME_BUTTON')
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
						c : [UUI.BUTTON_H({
							style : {
								padding : 10,
								fontSize : 15
							},
							icon : SPAN({
								style : {
									width : 12
								},
								c : FontAwesome.GetIcon('sign-in-alt')
							}),
							spacing : 10,
							title : MSG('LAYOUT_START_BUTTON')
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
						c : [UUI.BUTTON_H({
							style : {
								padding : 10,
								fontSize : 15
							},
							icon : SPAN({
								style : {
									width : 12
								},
								c : FontAwesome.GetIcon('list-ol')
							}),
							spacing : 10,
							title : MSG('LAYOUT_RANKING_BUTTON')
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
					},
					c : DIV({
						c : [DIV({
							style : {
								width : '100%',
								borderBottom : '1px solid #444',
								cursor : 'pointer'
							},
							c : [UUI.BUTTON_H({
								style : {
									padding : 10,
									fontSize : 15
								},
								icon : SPAN({
									style : {
										width : 12
									},
									c : FontAwesome.GetIcon('music')
								}),
								spacing : 10,
								title : MSG('BGM_TITLE')
							}), bgmList = DIV()]
						}), DIV({
							style : {
								width : '100%',
								borderBottom : '1px solid #444',
								cursor : 'pointer'
							},
							c : [UUI.BUTTON_H({
								style : {
									padding : 10,
									fontSize : 15
								},
								icon : SPAN({
									style : {
										width : 12
									},
									c : FontAwesome.GetIcon('tasks')
								}),
								spacing : 10,
								title : MSG('RUNNING_PROCESS_TITLE')
							}), processList = DIV()]
						})]
					})
				}),
	
				c : [Yogurt.Wrapper({
					style : {
						backgroundColor : '#333',
						color : '#fff'
					},
					c : [
	
					// content
					menuLayoutContent = DIV(),
					
					// footer
					DIV({
						style : {
							backgroundColor : '#222',
							color : '#999',
							padding : '20px',
							boxShadow : '0 -2px 4px rgba(0, 0, 0, .5)'
						},
						c : [DIV({
							style : {
								flt : 'left',
								marginTop : 2
							},
							c : [A({
								target : '_blank',
								href : 'https://btncafe.com',
								c : '© BTNcafe Co.'
							}), A({
								style : {
									marginLeft : 20
								},
								target : '_blank',
								href : 'https://btncafe.com',
								c : MSG('TERMS')
							}), A({
								style : {
									marginLeft : 20
								},
								target : '_blank',
								href : INFO.getLang() === 'ko' ? 'https://btncafe.com/R/privacy-kr.html' : (INFO.getLang().substring(0, 2) === 'zh' ? 'https://btncafe.com/R/privacy-zh.html' : 'https://btncafe.com/R/privacy.html'),
								c : MSG('PRIVACY')
							})]
						}), DIV({
							style : {
								flt : 'right'
							},
							c : [A({
								style : {
									fontSize : 20
								},
								c : FontAwesome.GetBrandIcon('facebook'),
								target : '_blank',
								href : 'https://www.facebook.com/etherfairy'
							}), A({
								style : {
									marginLeft : 20,
									fontSize : 20
								},
								c : FontAwesome.GetIcon('envelope'),
								href : 'contact@btncafe.com'
							})]
						}), CLEAR_BOTH()]
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
								}),
								
								// 요정 구매 버튼
								DIV({
									style : {
										width : '100%',
										cursor : 'pointer',
										backgroundColor : '#333'
									},
									c : UUI.BUTTON_H({
										style : {
											padding : 10,
											paddingLeft : 15,
											fontSize : 15
										},
										icon : SPAN({
											style : {
												width : 12
											},
											c : FontAwesome.GetIcon('shopping-cart')
										}),
										spacing : 10,
										title : MSG('BUY_FAIRY')
									}),
									on : {
										tap : () => {
											EtherFairy.GO('master/buyfairy');
											menuLayout.hideLeftMenu();
										}
									}
								}),
								
								// 요정 거래 버튼
								DIV({
									style : {
										borderTop : '1px solid #222',
										width : '100%',
										cursor : 'pointer',
										backgroundColor : '#333'
									},
									c : UUI.BUTTON_H({
										style : {
											padding : 10,
											paddingLeft : 15,
											fontSize : 15
										},
										icon : SPAN({
											style : {
												width : 12
											},
											c : FontAwesome.GetIcon('arrows-alt-h')
										}),
										spacing : 10,
										title : MSG('TRADE_FAIRY')
									}),
									on : {
										tap : () => {
											EtherFairy.GO('master/tradefairy');
											menuLayout.hideLeftMenu();
										}
									}
								}),
								
								// 요정 관리 버튼
								DIV({
									style : {
										borderTop : '1px solid #222',
										width : '100%',
										cursor : 'pointer',
										backgroundColor : '#333'
									},
									c : UUI.BUTTON_H({
										style : {
											padding : 10,
											paddingLeft : 15,
											fontSize : 15
										},
										icon : SPAN({
											style : {
												width : 12
											},
											c : FontAwesome.GetIcon('cog')
										}),
										spacing : 10,
										title : MSG('MANAGE_FAIRY')
									}),
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
							}),
							
							// 요정 원본 관리 버튼
							DIV({
								style : {
									width : '100%',
									cursor : 'pointer',
									backgroundColor : '#333'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 12
										},
										c : FontAwesome.GetIcon('cog')
									}),
									spacing : 10,
									title : MSG('MANAGE_FAIRY_ORIGIN')
								}),
								on : {
									tap : () => {
										EtherFairy.GO('designer/managefairyorigin');
										menuLayout.hideLeftMenu();
									}
								}
							}),
							
							// 매출 관리 버튼
							DIV({
								style : {
									borderTop : '1px solid #222',
									width : '100%',
									cursor : 'pointer',
									backgroundColor : '#333'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 12
										},
										c : FontAwesome.GetIcon('dollar-sign')
									}),
									spacing : 10,
									title : MSG('MANAGE_SALES')
								}),
								on : {
									tap : () => {
										EtherFairy.GO('designer/managesales');
										menuLayout.hideLeftMenu();
									}
								}
							}),
							
							// 로그아웃 버튼
							DIV({
								style : {
									borderTop : '1px solid #222',
									width : '100%',
									cursor : 'pointer',
									backgroundColor : '#333'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 12
										},
										c : FontAwesome.GetIcon('sign-out-alt')
									}),
									spacing : 10,
									title : MSG('LOGOUT')
								}),
								on : {
									tap : () => {
										EtherFairy.DesignerModel.logout();
										menuLayout.hideLeftMenu();
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
