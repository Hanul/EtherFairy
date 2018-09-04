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
					height : 425,
					backgroundImage : EtherFairy.R('main.png'),
					backgroundSize : 'cover',
					backgroundPosition : 'center center'
				},
				c : DIV({
					style : {
						width : 1010,
						padding : 10,
						margin : 'auto',
						paddingTop : 230,
						textAlign : 'center'
					},
					c : [P({
						style : {
							color : '#fff',
							fontSize : 50,
							fontWeight : 'bold',
							textShadow : '0 0 40px #000000, 0 0 40px #000000, 0 0 40px #000000'
						},
						c : MSG('HOME_TITLE')
					}), Yogurt.Button({
						style : {
							margin : 'auto',
							marginTop : 10,
							width : 200,
							boxShadow : '0 0 40px #000000'
						},
						title : MSG('START_BUTTON'),
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
					width : 1010,
					padding : 10,
					margin : 'auto',
					paddingBottom : 50
				},
				c : [
				
				DIV({
					style : {
						marginTop : 0,
					},
					c : [IMG({
						style : {
							width : 300,
							flt : 'left'
						},
						src : EtherFairy.R('fairysample.png')
					}), DIV({
						style : {
							width : 600,
							flt : 'right',
							fontSize : 20
						},
						c : [H2({
							style : {
								marginTop : 80,
								fontSize : 30,
								fontWeight : 'bold',
								color : '#fff5cb'
							},
							c : 'Ether Fairy란 무엇입니까?'
						}), P({
							style : {
								marginTop : 20
							},
							c : 'Ether Fairy는 이더리움을 기반으로 한 요정 거래 플랫폼입니다. 당신은 요정의 소유주가 되어 요정을 성장시키고, 당신의 요정은 다른 소유주의 요정들과 전투를 벌이게 됩니다.'
						}), P({
							style : {
								marginTop : 20
							},
							c : '최고의 요정을 육성시켜 Ether Fairy 세계관에서 가장 영향력 있는 소유주가 되시기 바랍니다!'
						})]
					}), CLEAR_BOTH()]
				}),
				
				DIV({
					style : {
						marginTop : 0,
					},
					c : [DIV({
						style : {
							width : 600,
							flt : 'left',
							fontSize : 20
						},
						c : [H2({
							style : {
								marginTop : 80,
								fontSize : 30,
								fontWeight : 'bold',
								color : '#fff5cb'
							},
							c : 'Ether Fairy란 무엇입니까?'
						}), P({
							style : {
								marginTop : 20
							},
							c : 'Ether Fairy는 이더리움을 기반으로 한 요정 거래 플랫폼입니다. 당신은 요정의 소유주가 되어 요정을 성장시키고, 당신의 요정은 다른 소유주의 요정들과 전투를 벌이게 됩니다.'
						}), P({
							style : {
								marginTop : 20
							},
							c : '최고의 요정을 육성시켜 Ether Fairy 세계관에서 가장 영향력 있는 소유주가 되시기 바랍니다!'
						})]
					}), IMG({
						style : {
							width : 300,
							flt : 'right'
						},
						src : EtherFairy.R('fairysample.png')
					}), CLEAR_BOTH()]
				}),
				
				DIV({
					style : {
						marginTop : 0,
					},
					c : [IMG({
						style : {
							width : 300,
							flt : 'left'
						},
						src : EtherFairy.R('fairysample.png')
					}), DIV({
						style : {
							width : 600,
							flt : 'right',
							fontSize : 20
						},
						c : [H2({
							style : {
								marginTop : 80,
								fontSize : 30,
								fontWeight : 'bold',
								color : '#fff5cb'
							},
							c : 'Ether Fairy란 무엇입니까?'
						}), P({
							style : {
								marginTop : 20
							},
							c : 'Ether Fairy는 이더리움을 기반으로 한 요정 거래 플랫폼입니다. 당신은 요정의 소유주가 되어 요정을 성장시키고, 당신의 요정은 다른 소유주의 요정들과 전투를 벌이게 됩니다.'
						}), P({
							style : {
								marginTop : 20
							},
							c : '최고의 요정을 육성시켜 Ether Fairy 세계관에서 가장 영향력 있는 소유주가 되시기 바랍니다!'
						})]
					}), CLEAR_BOTH()]
				}),
				
				P({
					style : {
						marginTop : 20,
						textAlign : 'center',
						color : '#fff5cb'
					},
					c : '최고의 순간이 당신 앞에 있습니다!\n지금 바로 시작해보세요!'
				}),
				
				Yogurt.Button({
					style : {
						marginTop : 20,
						fontSize : 30
					},
					title : MSG('START_BUTTON'),
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
