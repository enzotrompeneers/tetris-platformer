
	var Levels = {};
	var title, level;
	var amountOfLevels = 9;
	var levelsArr = [];

	Levels.preload = function() {
		title = {
	        font: '75px arcade', color: '#ffffff',
	        fill: '#ffffff',
	        align: 'center',
	        boundsAlignH: "center",
	        boundsAlignV: "middle"
    	};
    	level = {
	        font: '36px arcade', color: '#ffffff',
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

    	var text = game.add.text(0, 100, "levels", title);
    	text.setTextBounds(game.world.width/2 - 200, 0, 400, 100);
    	var levelNmb = 0;
    	for(var i = 1; i <= 3; i++) {
    		for(var j = 1; j <= 3; j++) {
    			levelNmb++;
    			var star = game.add.sprite(-120 + (j*175), 125 + (i*175), 'starDisabled');
    			star.scale.setTo(0.6);

    			var text = game.add.text(0, 0, levelNmb, level);

    			text.x = Math.floor(star.x + star.width / 2 - (text.width/2));
    			text.y = Math.floor(star.y + star.height / 2 - (text.height/2));

    			// push stars to array
    			levelsArr.push(star);
    		}
    	}

    	    			//star[0].input.onDown.add(startGame, this);
    	//levelsArr[0].input.onDown(startGame, this);


    //  Enables all kind of input actions on this image (click, etc)
    levelsArr[0].inputEnabled = true;

    levelsArr[0].events.onInputDown.add(startGame, this);

    	  //   	    		    var firstStar = 1;
		    	// var goldStar = game.add.sprite(-120 + (firstStar*175), 125 + (firstStar*175), 'star');
		    	// levelsArr[firstStar] = goldStar
		    	// console.log("Dit is een arr = "levelsArr[firstStar]);
		    	// goldStar.scale.setTo(0.6);
    	//console.log(levelsArr);

	};

	Levels.update = function() {

	};