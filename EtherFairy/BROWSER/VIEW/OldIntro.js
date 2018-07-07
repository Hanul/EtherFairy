EtherFairy.OldIntro = CLASS({
	
	preset : () => {
		return VIEW;
	},
	
	init : (inner, self) => {
		
		EtherFairy.Layout.setContent(DIV({
			style : {
				padding : 10
			},
			c : [
			
			H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_TITLE')
			}),
			
			P({
				style : {
					marginTop : 20
				},
				c : MSG('INTRO_DESCRIPTION')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_1')
			}),
			H3({
				style : {
					marginTop : 20,
					fontSize : 20,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_TITLE_1')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_1')
			}),
			H3({
				style : {
					marginTop : 20,
					fontSize : 20,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_TITLE_2')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_2')
			}),
			H3({
				style : {
					marginTop : 20,
					fontSize : 20,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_TITLE_3')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_1_SUB_3')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_2')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_2')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_3')
			}),
			H3({
				style : {
					marginTop : 20,
					fontSize : 20,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_PARAGRAPH_3_SUB_TITLE_1')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_3_SUB_1')
			}),
			H3({
				style : {
					marginTop : 20,
					fontSize : 20,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_PARAGRAPH_3_SUB_TITLE_2')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_3_SUB_2')
			}),
			IMG({
				style : {
					maxWidth : '100%',
					display : 'block',
					margin : 'auto',
					marginTop : 20
				},
				src : EtherFairy.R('properties.png')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_4')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_4_1')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_4_2')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_5')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_5_1')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_5_2')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_5_3')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_6')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_6')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_7')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_7')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_8')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_8')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_9')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_9')
			}),
			
			H2({
				style : {
					marginTop : 30,
					fontSize : 25,
					fontWeight : 'bold',
					color : '#FFEA4F',
					textShadow : '0 0 20px #000000'
				},
				c : MSG('INTRO_SUB_TITLE_10')
			}),
			P({
				style : {
					marginTop : 10
				},
				c : MSG('INTRO_PARAGRAPH_10')
			})
			
			]
		}));
	}
});
