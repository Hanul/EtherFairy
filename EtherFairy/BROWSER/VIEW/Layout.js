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
			
			let audioPlayer1;
			let audioPlayer2;
			let menuLayout = Yogurt.MenuLayout({
				
				style : {
					color : '#999'
				},
				
				toolbar : Yogurt.Toolbar({
					
					height : 68,
	
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
							marginTop : 10,
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
							marginTop : 10,
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
						icon : FontAwesome.GetIcon('clipboard-list'),
						on : {
							tap : (e) => {
								menuLayout.toggleRightMenu();
							}
						}
					}),
	
					// title
					title : A({
						style : {
							position : 'relative'
						},
						c : [IMG({
							style : {
								marginTop : -5,
								width : 192
							},
							src : EtherFairy.R('logo.png')
						}), SPAN({
							style : {
								position : 'absolute',
								right : -10,
								bottom : 10,
								fontStyle : 'italic',
								fontSize : 14,
								color : '#FFCC33'
							},
							c : 'beta'
						}), CLEAR_BOTH()],
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
									width : 15,
									textAlign : 'center'
								},
								c : FontAwesome.GetIcon('home')
							}),
							spacing : 10,
							title : MSG('SIDEBAR_HOME_BUTTON')
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
									width : 15,
									textAlign : 'center'
								},
								c : FontAwesome.GetIcon('sign-in-alt')
							}),
							spacing : 10,
							title : MSG('SIDEBAR_START_BUTTON')
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
									width : 15,
									textAlign : 'center'
								},
								c : FontAwesome.GetIcon('trophy')
							}),
							spacing : 10,
							title : MSG('SIDEBAR_LEADERBOARD_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('ranking');
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
									width : 15,
									textAlign : 'center'
								},
								c : FontAwesome.GetIcon('list-ol')
							}),
							spacing : 10,
							title : MSG('SIDEBAR_OWNER_LEADERBOARD_BUTTON')
						})],
						on : {
							tap : () => {
								EtherFairy.GO('master/ranking');
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
								borderBottom : '1px solid #444'
							},
							c : [UUI.BUTTON_H({
								style : {
									padding : 10,
									fontSize : 15
								},
								icon : SPAN({
									style : {
										width : 15,
										textAlign : 'center'
									},
									c : FontAwesome.GetIcon('music')
								}),
								spacing : 10,
								title : MSG('SIDEBAR_THEME_NAMETAG')
							}), audioPlayer1 = EtherFairy.AudioPlayer({
								style : {
									borderTop : '1px solid #444'
								},
								mp3 : EtherFairy.R('theme/etherfairy_theme.mp3'),
								on : {
									play : () => {
										audioPlayer2.stop();
									}
								}
							}, () => {
								audioPlayer2.play();
							}), audioPlayer2 = EtherFairy.AudioPlayer({
								style : {
									borderTop : '1px solid #444'
								},
								mp3 : EtherFairy.R('theme/etherfairy_track2.mp3'),
								on : {
									play : () => {
										audioPlayer1.stop();
									}
								}
							}, () => {
								audioPlayer1.play();
							})]
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
										width : 15,
										textAlign : 'center'
									},
									c : FontAwesome.GetIcon('tasks')
								}),
								spacing : 10,
								title : MSG('SIDEBAR_RUNNING_PROCESS_NAMETAG')
							}), processList = DIV()]
						})]
					})
				}),
	
				c : [Yogurt.Wrapper({
					style : {
						backgroundColor : '#1f2328',
						color : '#fff'
					},
					c : [
	
					// content
					menuLayoutContent = DIV(),
					
					// footer
					DIV({
						style : {
							backgroundColor : '#171a1d',
							color : '#999',
							padding : '20px',
							boxShadow : '0 -2px 4px rgba(0, 0, 0, .5)',
							lineHeight : '1.5em',
							onDisplayResize : (width, height) => {
								if (width < 820) {
									return {
										fontSize : 14
									};
								} else {
									return {
										fontSize : 16
									};
								}
							}
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
								c : MSG('FOOTER_TERMS_BUTTON')
							}), A({
								style : {
									marginLeft : 20
								},
								target : '_blank',
								href : INFO.getLang() === 'ko' ? 'https://btncafe.com/R/privacy-kr.html' : (INFO.getLang().substring(0, 2) === 'zh' ? 'https://btncafe.com/R/privacy-zh.html' : 'https://btncafe.com/R/privacy.html'),
								c : MSG('FOOTER_PRIVACY_BUTTON')
							})]
						}), DIV({
							style : {
								flt : 'right'
							},
							c : [A({
								style : {
									marginLeft : 20,
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
								href : 'mailto:contact@btncafe.com'
							})]
						}), CLEAR_BOTH()]
					})]
				})]
			}).appendTo(BODY);
			
			NEXT([
			(next) => {
				
				// 메타마스크가 설치되어 있는 경우
				if (Contract2Object.checkWalletEnable() === true) {
					
					Contract2Object.checkWalletLocked((isLocked) => {
						
						if (isLocked !== true) {
							
							Contract2Object.getWalletAddress((walletAddress) => {
								
								EtherFairy.MasterModel.get(walletAddress, {
									
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
											c : [
											UUI.BUTTON_H({
												style : {
													padding : 10,
													paddingLeft : 10,
													fontSize : 15
												},
												icon : IMG({
													src : EtherFairy.R('layout/master.png')
												}),
												spacing : 10,
												title : MSG('SIDEBAR_OWNER_MENU_BUTTON')
											}),
											
											// 소유주 홈 버튼
											DIV({
												style : {
													width : '100%',
													cursor : 'pointer',
													backgroundColor : '#33393e'
												},
												c : UUI.BUTTON_H({
													style : {
														padding : 10,
														paddingLeft : 15,
														fontSize : 15
													},
													icon : SPAN({
														style : {
															width : 15,
															textAlign : 'center'
														},
														c : FontAwesome.GetIcon('home')
													}),
													spacing : 10,
													title : MSG('OWNER_HOME_BUTTON')
												}),
												on : {
													tap : () => {
														EtherFairy.GO('master');
														menuLayout.hideLeftMenu();
													}
												}
											}),
											
											// 요정 구매 버튼
											DIV({
												style : {
													borderTop : '1px solid #222',
													width : '100%',
													cursor : 'pointer',
													backgroundColor : '#33393e'
												},
												c : UUI.BUTTON_H({
													style : {
														padding : 10,
														paddingLeft : 15,
														fontSize : 15
													},
													icon : SPAN({
														style : {
															width : 15,
															textAlign : 'center'
														},
														c : FontAwesome.GetIcon('shopping-cart')
													}),
													spacing : 10,
													title : MSG('SIDEBAR_BUY_FAIRY_BUTTON')
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
													backgroundColor : '#33393e'
												},
												c : UUI.BUTTON_H({
													style : {
														padding : 10,
														paddingLeft : 15,
														fontSize : 15
													},
													icon : SPAN({
														style : {
															width : 15,
															textAlign : 'center'
														},
														c : FontAwesome.GetIcon('arrows-alt-h')
													}),
													spacing : 10,
													title : MSG('SIDEBAR_TRADE_FAIRY_BUTTON')
												}),
												on : {
													tap : () => {
														EtherFairy.GO('master/tradefairy');
														menuLayout.hideLeftMenu();
													}
												}
											})]
										}));
										
										next(true);
									}
								});
							});
						}
						
						else {
							next();
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
							c : [
							UUI.BUTTON_H({
								style : {
									padding : 10,
									paddingLeft : 10,
									fontSize : 15
								},
								icon : IMG({
									src : EtherFairy.R('layout/designer.png')
								}),
								spacing : 10,
								title : MSG('SIDEBAR_DESIGNER_MENU_NAMETAG')
							}),
							
							// 디자이너 홈 버튼
							DIV({
								style : {
									width : '100%',
									cursor : 'pointer',
									backgroundColor : '#33393e'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 15,
											textAlign : 'center'
										},
										c : FontAwesome.GetIcon('home')
									}),
									spacing : 10,
									title : MSG('DESIGNER_HOME_BUTTON')
								}),
								on : {
									tap : () => {
										EtherFairy.GO('designer');
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
									backgroundColor : '#33393e'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 15,
											textAlign : 'center'
										},
										c : FontAwesome.GetIcon('dollar-sign')
									}),
									spacing : 10,
									title : MSG('SIDEBAR_MANAGE_SALES_BUTTON')
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
									backgroundColor : '#33393e'
								},
								c : UUI.BUTTON_H({
									style : {
										padding : 10,
										paddingLeft : 15,
										fontSize : 15
									},
									icon : SPAN({
										style : {
											width : 15,
											textAlign : 'center'
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
