
	var Levels = {};
	var title, level;
	var amountOfLevels = 9;
	var levelsArr = [];

	Levels.preload = function() {
		title = {
	        font: '100px arcade',
	        fill: '#ffffff',
	        align: 'center',
	        boundsAlignH: "center",
	        boundsAlignV: "middle"
    	};
    	level = {
	        font: '48px arcade',
	        fill: '#0d151f',
	        align: 'center'
    	};
    	//load background
		game.load.image('bg', 'assets/background.jpg');
		// load star
		game.load.spritesheet('star', 'assets/star.png');
		// load disabled star
		game.load.spritesheet('starDisabled', 'assets/starDisabled.png');
		// load webfontloader
    	game.load.script('classic-arcade', '//cdnjs.cloudflare.com/ajax/libs/webfont/1.6.27/webfontloader.js');
	};

	Levels.create = function() {
		levelsArr = [];
		// add bg to game world
		var bg = game.add.tileSprite(0, 0, 768, 1344, 'bg');
		// calculate the difference between the width of the game and of background
	    var differWidth = game.world.width / bg.width;
	    // calculate the difference between the height of the game and of background
	    var differHeight = game.world.height / bg.height;

	    // set the scale to the difference variables
	    bg.scale.setTo(differWidth, differHeight);
	    // set the alpha of background
	    bg.alpha = 0.2;

    	var text = game.add.text(0, 150, "levels", title);
    	text.setTextBounds(game.world.width/2 - 200, 0, 400, 100);
    	var levelNmb = 0;
    	for(var i = 1; i <= 3; i++) {
    		for(var j = 1; j <= 3; j++) {
    			levelNmb++;
    			var star = game.add.sprite(-120 + (j*215), 195 + (i*225), 'starDisabled');
    			star.scale.setTo(0.8);

    			var text = game.add.text(0, 0, levelNmb, level);

    			text.x = Math.floor(star.x + star.width / 2 - (text.width/2));
    			text.y = Math.floor(star.y + star.height / 2 - (text.height/2));

    			// push stars to array
    			levelsArr.push(star);
    		}
    	}

			if(levelsArr) {
				//console.log("dit is de eerste element: " + levelsArr[0]);
		    	//levelsArr[0].events.onInputDown.add(startGame, this);

					for(var i = 0; i < levelsArr.length; i++) {
						levelsArr[i].inputEnabled = true;
						levelsArr[i].events.onInputDown.add(startGame, this);
					}
		    	//als je op button 1 duwt, moet de globale variabele level = 1 zijn.
		    	//button 2 maakt level = 2 etc.

		    	//elke button moet via een for loop een object worden waar je op kan klikken
			}


    	  //   	    		    var firstStar = 1;
		    	// var goldStar = game.add.sprite(-120 + (firstStar*175), 125 + (firstStar*175), 'star');
		    	// levelsArr[firstStar] = goldStar
		    	// console.log("Dit is een arr = "levelsArr[firstStar]);
		    	// goldStar.scale.setTo(0.6);
    	//console.log(levelsArr);

	};

	Levels.update = function() {

	};
