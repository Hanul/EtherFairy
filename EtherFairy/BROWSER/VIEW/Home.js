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
			c : [
				
			DIV({
				style : {
					backgroundImage : EtherFairy.R('main.png'),
					backgroundSize : 'cover',
					backgroundPosition : 'center center',
					onDisplayResize : (width, height) => {
						if (width < 620) {
							return {
								height : 280
							};
						} else if (width < 820) {
							return {
								height : 320
							};
						} else if (width < 1550) {
							return {
								height : 400
							};
						} else {
							return {
								height : 425
							};
						}
					}
				},
				c : DIV({
					style : {
						padding : 10,
						margin : 'auto',
						textAlign : 'center',
						onDisplayResize : (width, height) => {
							if (width < 620) {
								return {
									paddingTop : 100,
									width : 300
								};
							} else if (width < 820) {
								return {
									paddingTop : 150,
									width : 600
								};
							} else if (width < 1550) {
								return {
									paddingTop : 200,
									width : 800
								};
							} else {
								return {
									paddingTop : 230,
									width : 1110
								};
							}
						}
					},
					c : [P({
						style : {
							color : '#fff',
							fontWeight : 'bold',
							textShadow : '0 0 40px #000000, 0 0 40px #000000, 0 0 40px #000000',
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										fontSize : 25
									};
								} else if (width < 820) {
									return {
										fontSize : 30
									};
								} else if (width < 1550) {
									return {
										fontSize : 40
									};
								} else {
									return {
										fontSize : 50
									};
								}
							}
						},
						c : MSG('HOME_TITLE')
					}), Yogurt.Button({
						style : {
							margin : 'auto',
							marginTop : 10,
							width : 200,
							boxShadow : '0 0 40px #000000'
						},
						title : MSG('HOME_BODY_START_BUTTON'),
						on : {
							tap : () => {
								EtherFairy.GO('start')
							}
						}
					})]
				})
			}),
			
			DIV({
				style : {
					padding : 10,
					margin : 'auto',
					paddingBottom : 50,
					onDisplayResize : (width, height) => {
						if (width < 620) {
							return {
								width : 300
							};
						} else if (width < 820) {
							return {
								width : 570
							};
						} else if (width < 1550) {
							return {
								width : 700
							};
						} else {
							return {
								width : 1010
							};
						}
					}
				},
				c : [
				
				DIV({
					style : {
						onDisplayResize : (width, height) => {
							if (width < 1550) {
								return {
									marginTop : 30
								};
							} else {
								return {
									marginTop : 0
								};
							}
						}
					},
					c : [IMG({
						style : {
							flt : 'left',
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										display : 'none'
									};
								} else if (width < 820) {
									return {
										display : 'block',
										width : 150
									};
								} else if (width < 1550) {
									return {
										display : 'block',
										width : 200
									};
								} else {
									return {
										display : 'block',
										width : 300
									};
								}
							}
						},
						src : EtherFairy.R('fairysample.png')
					}), DIV({
						style : {
							flt : 'right',
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										fontSize : 14,
										width : 300
									};
								} else if (width < 820) {
									return {
										fontSize : 16,
										width : 380
									};
								} else if (width < 1550) {
									return {
										fontSize : 18,
										width : 460
									};
								} else {
									return {
										fontSize : 20,
										width : 600
									};
								}
							}
						},
						c : [H2({
							style : {
								fontWeight : 'bold',
								color : '#fff5cb',
								onDisplayResize : (width, height) => {
									if (width < 620) {
										return {
											marginTop : 0,
											fontSize : 18
										};
									} else if (width < 820) {
										return {
											marginTop : 0,
											fontSize : 22
										};
									} else if (width < 1550) {
										return {
											marginTop : 0,
											fontSize : 26
										};
									} else {
										return {
											marginTop : 60,
											fontSize : 30
										};
									}
								}
							},
							c : MSG('HOME_BODY_1_NAMETAG')
						}), P({
							style : {
								marginTop : 20
							},
							c : MSG('HOME_BODY_1_DESCRIPTION_1')
						}), P({
							style : {
								marginTop : 20
							},
							c : MSG('HOME_BODY_1_DESCRIPTION_2')
						}), Yogurt.Button({
							style : {
								margin : 'auto',
								marginTop : 30,
								fontSize : 20,
								width : 200
							},
							title : MSG('HOME_BODY_HOW_TO_BUTTON'),
							target : '_blank',
							href : 'https://medium.com/@youngjaesim/'
						})]
					}), CLEAR_BOTH()]
				}),
				
				DIV({
					style : {
						onDisplayResize : (width, height) => {
							if (width < 1550) {
								return {
									marginTop : 30
								};
							} else {
								return {
									marginTop : 0
								};
							}
						}
					},
					c : [DIV({
						style : {
							width : 600,
							flt : 'left',
							fontSize : 20,
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										fontSize : 14,
										width : 300
									};
								} else if (width < 820) {
									return {
										fontSize : 16,
										width : 380
									};
								} else if (width < 1550) {
									return {
										fontSize : 18,
										width : 460
									};
								} else {
									return {
										fontSize : 20,
										width : 600
									};
								}
							}
						},
						c : [H2({
							style : {
								marginTop : 80,
								fontSize : 30,
								fontWeight : 'bold',
								color : '#fff5cb',
								onDisplayResize : (width, height) => {
									if (width < 620) {
										return {
											marginTop : 0,
											fontSize : 18
										};
									} else if (width < 820) {
										return {
											marginTop : 0,
											fontSize : 22
										};
									} else if (width < 1550) {
										return {
											marginTop : 0,
											fontSize : 26
										};
									} else {
										return {
											marginTop : 60,
											fontSize : 30
										};
									}
								}
							},
							c : MSG('HOME_BODY_2_NAMETAG')
						}), P({
							style : {
								marginTop : 20
							},
							c : MSG('HOME_BODY_2_DESCRIPTION_1')
						}), P({
							style : {
								marginTop : 20
							},
							c : MSG('HOME_BODY_2_DESCRIPTION_2')
						}), Yogurt.Button({
							style : {
								margin : 'auto',
								marginTop : 30,
								fontSize : 20,
								width : 200
							},
							title : MSG('START_DESIGNER_BUTTON'),
							on : {
								tap : () => {
									EtherFairy.GO('designer/start');
								}
							}
						})]
					}), IMG({
						style : {
							width : 300,
							flt : 'right',
							onDisplayResize : (width, height) => {
								if (width < 620) {
									return {
										display : 'none'
									};
								} else if (width < 820) {
									return {
										display : 'block',
										width : 150
									};
								} else if (width < 1550) {
									return {
										display : 'block',
										width : 200
									};
								} else {
									return {
										display : 'block',
										width : 300
									};
								}
							}
						},
						src : EtherFairy.R('fairysample2.png')
					}), CLEAR_BOTH()]
				}),
				
				Yogurt.Button({
					style : {
						marginTop : 20,
						fontSize : 30
					},
					title : MSG('HOME_BODY_START_BUTTON'),
					on : {
						tap : () => {
							EtherFairy.GO('start')
						}
					}
				})]
			})]
		}));
	}
});
