EtherFairy('Master').Ranking = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		let list;
		let bottom;
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : '50px 0'
			},
			c : DIV({
				style : {
					position : 'relative',
					margin : 'auto',
					width : 882,
					height : 966,
					backgroundImage : EtherFairy.R('rank/background.png')
				},
				c : [H1({
					style : {
						paddingTop : 65,
						fontSize : 24,
						fontWeight : 'bold',
						color : '#ffde5c',
						textShadow : EtherFairy.TextBorderShadow('#160b00'),
						textAlign : 'center'
					},
					c : MSG('OWNER_LEADERBOARD_TITLE')
				}),
				
				UUI.V_CENTER({
					style : {
						position : 'absolute',
						top : 62,
						right : 34,
						width : 177,
						height : 34,
						textShadow : EtherFairy.TextBorderShadow('#160b00'),
						backgroundImage : EtherFairy.R('rank/sort.png'),
						textAlign : 'center',
						cursor : 'pointer'
					},
					c : MSG('OWN_FAIRY_COUNT_ORDER'),
					on : {
						tap : (e, button) => {
							
							if (order === 'fairyCount') {
								order = 'totalFairyLevel';
								button.empty();
								button.append(MSG('OWN_FAIRY_LEVEL_ORDER'));
							} else if (order === 'totalFairyLevel') {
								order = 'totalFairyRating';
								button.empty();
								button.append(MSG('OWN_FAIRY_RATING_ORDER'));
							} else if (order === 'totalFairyRating') {
								order = 'fairyCount';
								button.empty();
								button.append(MSG('OWN_FAIRY_COUNT_ORDER'));
							}
							
							start = 0;
							
							loadRanking();
						}
					}
				}),
				
				DIV({
					style : {
						width : 800,
						margin : 'auto',
						marginTop : 22,
						textAlign : 'center'
					},
					c : [DIV({
						style : {
							flt : 'left',
							width : 200
						},
						c : MSG('OWNER_NAME')
					}), DIV({
						style : {
							flt : 'left',
							width : 200
						},
						c : MSG('OWN_FAIRY_COUNT')
					}), DIV({
						style : {
							flt : 'left',
							width : 200
						},
						c : MSG('OWN_FAIRY_TOTAL_LEVEL')
					}), DIV({
						style : {
							flt : 'left',
							width : 200
						},
						c : MSG('OWN_FAIRY_TOTAL_RATING')
					}), CLEAR_BOTH()]
				}),
				
				list = DIV({
					style : {
						width : 826,
						height : 748,
						margin : 'auto',
						marginTop : 15
					}
				}),
				
				// bottom
				bottom = DIV({
					style : {
						margin : 'auto',
						width : 826
					}
				})]
			})
		}));
		
		let start = 0;
		let count = 10;
		let order = 'fairyCount';
		
		let loadRanking = () => {
			
			let sort = {};
			
			if (order === 'fairyCount') {
				sort.fairyCount = -1;
			} else if (order === 'totalFairyLevel') {
				sort.totalFairyLevel = -1;
			} else if (order === 'totalFairyRating') {
				sort.totalFairyRating = -1;
			}
			
			EtherFairy.MasterModel.find({
				sort : sort,
				start : start,
				count : count
			}, (masterDataSet) => {
				
				list.empty();
				
				EACH(masterDataSet, (masterData, i) => {
					list.append(DIV({
						style : {
							marginBottom : 2,
							width : 800,
							height : 73,
							padding : '0 13px',
							backgroundImage : EtherFairy.R('rank/list.png'),
							textAlign : 'center'
						},
						c : [UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 30,
								marginRight : 11,
								textShadow : EtherFairy.TextBorderShadow('#160b00'),
								color : '#ffde5c'
							},
							c : i + 1
						}), UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 68
							},
							c : DIV({
								style : {
									width : 64,
									height : 64,
									padding : 2,
									backgroundImage : EtherFairy.R('rank/picture.png'),
									cursor : 'pointer'
								},
								c : IMG({
									style : {
										width : 63,
										height : 63,
										borderRadius : 3
									},
									src : masterData.profileImageFileId === undefined ? EtherFairy.R('default-profile.png') : EtherFairy.RF(masterData.profileImageFileId)
								}),
								on : {
									tap : () => {
										EtherFairy.GO('master/' + masterData.id);
									}
								}
							})
						}), UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 71,
								marginLeft : 20,
								textAlign : 'left',
								textShadow : EtherFairy.TextBorderShadow('#160b00'),
								color : '#fff5cb'
							},
							c : A({
								c : masterData.nickname,
								on : {
									tap : () => {
										EtherFairy.GO('master/' + masterData.id);
									}
								}
							})
						}), UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 200
							},
							c : masterData.fairyCount
						}), UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 200
							},
							c : masterData.totalFairyLevel
						}), UUI.V_CENTER({
							style : {
								flt : 'left',
								height : 73,
								width : 200
							},
							c : masterData.totalFairyRating
						}), CLEAR_BOTH()]
					}));
				});
			});
		};
		
		loadRanking();
		
		bottom.append(UUI.BUTTON_H({
			style : {
				marginTop : 10,
				marginLeft : 10,
				flt : 'left',
				textShadow : EtherFairy.TextBorderShadow('#160b00')
			},
			icon : IMG({
				src : EtherFairy.R('rank/arrow.png')
			}),
			spacing : 10,
			title : MSG('PREVIOUS_BUTTON'),
			on : {
				tap : () => {
					start -= count;
					if (start < 0) {
						start = 0;
					}
					loadRanking();
				}
			}
		}));
		
		bottom.append(UUI.BUTTON_H({
			style : {
				marginTop : 10,
				marginRight : 12,
				flt : 'right',
				textShadow : EtherFairy.TextBorderShadow('#160b00')
			},
			icon : IMG({
				style : {
					transform : 'scaleX(-1)'
				},
				src : EtherFairy.R('rank/arrow.png')
			}),
			isIconRight : true,
			spacing : 10,
			title : MSG('NEXT_BUTTON'),
			on : {
				tap : () => {
					start += count;
					loadRanking();
				}
			}
		}));
		
		bottom.append(CLEAR_BOTH());
	}
});
