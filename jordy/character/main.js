// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(600, 400);

// Create the state that will contain the whole game
var mainState = {
    //Preload verhuizen naar andere gamestate
    preload: function() {
        
        game.load.spritesheet('character', 'assets/dude.png', 32, 48);
        
    },

    // The game objects and the game itself is created here
    create: function() {
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        player = game.add.sprite(0,0, 'character');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        
        cursors = game.input.keyboard.createCursorKeys();
    },

    // Update runs 60 frames/sec
    update: function() {
        
        //Sliding
        player.body.velocity.x = 0;

        //Movement
        if (cursors.left.isDown)
        {
            player.body.velocity.x = -150;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 150;
            player.animations.play('right');
        }
        else
        {
            player.animations.stop();
            player.frame = 4;
        }
        //JUMP + "&& tetrisblok.body.touching.down"
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
        }
        
    },
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
