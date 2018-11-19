EtherFairy.AudioPlayer = CLASS((cls) => {
	
	let sounds = {};
	let endHandlers = {};
	
	return {
		
		preset : () => {
			return DIV;
		},
		
		params : () => {
			return {
				style : {
					padding : '10px 15px'
				}
			};
		},
		
		init : (inner, self, params, playNext) => {
			//REQUIRED: params
			//REQUIRED: params.mp3
			//OPTIONAL: playNext
			
			let key = JSON.stringify(params);
			
			let sound = sounds[key];
			
			if (sound === undefined) {
				sound = sounds[key] = SOUND(params, () => {
					EACH(endHandlers[key], (endHandler) => {
						endHandler();
					});
				});
			}
			
			if (endHandlers[key] === undefined) {
				endHandlers[key] = [];
			}
			
			endHandlers[key].push(() => {
				
				if (self.checkIsRemoved() !== true) {
					
					playButton.empty();
					playButton.append(IMG({
						src : EtherFairy.R('player/play.png')
					}));
					
					if (playNext !== undefined) {
						playNext();
					}
				}
			});
			
			let volume = sound.getVolume();
			let isSoundOn = true;
			
			let playButton;
			self.append(playButton = A({
				style : {
					flt : 'left'
				},
				c : IMG({
					src : EtherFairy.R('player/play.png')
				}),
				on : {
					tap : () => {
						
						if (sound.checkIsPlaying() !== true) {
							sound.play();
							playButton.empty();
							playButton.append(IMG({
								src : EtherFairy.R('player/pause.png')
							}));
							
							self.fireEvent('play');
						}
						
						else {
							sound.pause();
							playButton.empty();
							playButton.append(IMG({
								src : EtherFairy.R('player/play.png')
							}));
						}
					}
				}
			}));
			
			let rangeWrapper;
			self.append(rangeWrapper = DIV({
				style : {
					marginTop : 5,
					marginLeft : 16,
					flt : 'left',
					width : 69,
					height : 6,
					backgroundImage : EtherFairy.R('player/lineback.png')
				}
			}));
			
			let durationPanel;
			self.append(durationPanel = DIV({
				style : {
					marginLeft : 12,
					flt : 'left'
				},
				c : '0:00'
			}));
			
			sound.on('load', () => {
				
				let range;
				let isRangeChanging;
				rangeWrapper.append(range = UUI.RANGE({
					value : 0,
					max : sound.getDuration(),
					style : {
						padding : 0
					},
					trackStyle : {
						width : 69,
						height : 6
					},
					thumbStyle : {
						backgroundImage : EtherFairy.R('player/circle.png'),
						width : 14,
						height : 14
					},
					on : {
						touchstart : () => {
							isRangeChanging = true;
						},
						touchend : () => {
							isRangeChanging = false;
							
							sound.pause();
							sound.play(range.getValue());
							
							durationPanel.empty();
							let second = INTEGER(range.getValue() % 60);
							durationPanel.append(INTEGER(range.getValue() / 60) + ':' + (second < 10 ? '0' + second : second));
							
							playButton.empty();
							playButton.append(IMG({
								src : EtherFairy.R('player/pause.png')
							}));
						}
					}
				}));
				
				let interval = INTERVAL(1, RAR(() => {
					
					if (isRangeChanging !== true && sound.getStartAt() > 0) {
						
						let after = Date.now() / 1000 - sound.getStartAt();
						if (sound.checkIsPlaying() !== true) {
							after = 0;
						}
						
						range.setValue(after);
						
						durationPanel.empty();
						let second = INTEGER(after % 60);
						durationPanel.append(INTEGER(after / 60) + ':' + (second < 10 ? '0' + second : second));
					}
				}));
				
				self.on('remove', () => {
					interval.remove();
				});
			});
			
			// 이미 재생중인 경우
			if (sound.checkIsPlaying() === true) {
				playButton.empty();
				playButton.append(IMG({
					src : EtherFairy.R('player/pause.png')
				}));
			}
			
			let speakerButton;
			self.append(speakerButton = A({
				style : {
					flt : 'right'
				},
				c : IMG({
					src : EtherFairy.R('player/speakeron.png')
				}),
				on : {
					tap : () => {
						
						if (isSoundOn === true) {
							speakerButton.empty();
							speakerButton.append(IMG({
								src : EtherFairy.R('player/speakeroff.png')
							}));
							isSoundOn = false;
							sound.setVolume(0);
						}
						
						else {
							speakerButton.empty();
							speakerButton.append(IMG({
								src : EtherFairy.R('player/speakeron.png')
							}));
							isSoundOn = true;
							sound.setVolume(volume);
						}
					}
				}
			}));
			
			self.append(CLEAR_BOTH());
			
			let play = self.play = () => {
				playButton.tap();
			};
			
			let stop = self.stop = () => {
				
				sound.stop();
				
				playButton.empty();
				playButton.append(IMG({
					src : EtherFairy.R('player/play.png')
				}));
			};
		}
	};
});
