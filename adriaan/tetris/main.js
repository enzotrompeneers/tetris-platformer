// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(800, 600);
var platforms;
var block;

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {

	    game.load.image('sky', 'assets/sky.png');
	    game.load.image('ground', 'assets/platform.png');
	    game.load.image('star', 'assets/star.png');
	    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    },

    // The game objects and the game itself is created here
    create: function() {

    	cursors = game.input.keyboard.createCursorKeys();
    	//game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    	keySpawn = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    	keySpawn.onDown.add(fireBlock, this);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 100;
        game.add.sprite(0, 0, 'sky');

        platforms = game.add.group();
        platforms.enableBody = true;


        var ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;
        ground.body.collideWorldBounds = true;
    },

    // Update runs 60 frames/sec
    update: function() {

    	if (block) {
    		block.body.velocity.x = 0;
    		//console.log(block.body.velocity.y);

	    	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	        	block.body.velocity.x = -75;
	    	}

	    	if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	        	block.body.velocity.x = 75;
    		}
    	}

    	if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        	fireBlock();
    	}

    	game.physics.arcade.collide(platforms, platforms, blocksTouched, null, this);

    },
};

function fireBlock () {

	rand = Math.floor(Math.random()*15+1)
    //console.log(rand);
    block = platforms.create(rand * 50, 0, 'ground');
    block.scale.setTo(0.08,1);
    block.body.collideWorldBounds = true;
    block.body.bounce.y = 0.0;
    block.body.allowGravity = false;
    block.body.velocity.y = 100;

}

function blocksTouched(a, b) {
	a.body.velocity.y = 0;
	b.body.velocity.y = 0;

	a.body.velocity.x = 0;
	b.body.velocity.x = 0;

	a.body.immovable = true;
	b.body.immovable = true;
	//console.log("a: " + a);
	//console.log("b: " + b);
	fireBlock();

}


// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
