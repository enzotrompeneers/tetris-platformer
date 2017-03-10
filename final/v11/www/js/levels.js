
	var Levels = {};
	var title, level;
	var amountOfLevels = 9;
	var levelsArr = [];
	var goldStarArr = [];
	var isLevelDisabled;

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
		levelsArr = []
		//console.log("lol");
		//levelsArr = [];
		isLevelDisabled = false;
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
					var star = game.add.sprite(-120 + (j*215), 195 + (i*225), 'star');
	    		star.scale.setTo(0.8);
					star.inputEnabled = true;
					star.events.onInputDown.add(startGame, this);

    			var text = game.add.text(0, 0, levelNmb, level);

    			text.x = Math.floor(star.x + star.width / 2 - (text.width/2));
    			text.y = Math.floor(star.y + star.height / 2 - (text.height/2));

    			// push stars to array
    			levelsArr.push(star);
    		}
    	}

			// check if currentLevel is set and currentLevel is smaller than the length of the array
			/*if(currentLevel && currentLevel < levelsArr.length) {
				if(!isLevelDisabled) {
					// get position of stars
					var xPos = levelsArr[currentLevel].position.x;
					var yPos = levelsArr[currentLevel].position.y;
					var goldStar = game.add.sprite(xPos, yPos, 'star');
					goldStar.scale.setTo(0.8);


					// put goldStar in Array
				  levelsArr[currentLevel] = goldStar
					levelsArr[currentLevel].inputEnabled = true;
					levelsArr[currentLevel].events.onInputDown.add(startGame, this);
				}
				// Dit is de cheat code
				/*var lvl = currentLevel;
				var xPos = levelsArr[lvl - 1].position.x;
				var yPos = levelsArr[lvl - 1].position.y;
				var goldStar = game.add.sprite(xPos, yPos, 'star');
				goldStar.scale.setTo(0.8);
			  levelsArr[lvl] = goldStar
				//console.log(levelsArr[lvl].position.x);
			  //console.log("Dit is een arr = "levelsArr[firstStar]);
	    	console.log("Dit is de gouden ster als de game gewonnen is = " + goldStar);
			}*/


	};

	Levels.update = function() {

	};
