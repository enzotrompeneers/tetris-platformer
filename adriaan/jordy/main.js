// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(1080, 1920);

var toggle = false;
var gameStart = false;

// Create the state that will contain the whole game
var mainState = {
    //Preload verhuizen naar andere gamestate
    preload: function () {

        game.load.spritesheet('character', 'assets/dude.png', 32, 48);
        game.load.image('box', 'assets/blokje 3.jpg');
        game.load.image('background', 'assets/background.jpg');
        keyT = game.input.keyboard.addKey(Phaser.Keyboard.T);
        keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);

    },

    // The game objects and the game itself is created here
    create: function () {

        game.add.sprite(0, 0, 'background');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        player = game.add.sprite(0, 0, 'character');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.scale.setTo(2, 2);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();

        //Group for tetrisblok update function
        tetromino = game.add.group();
    },

    // Update runs 60 frames/sec
    update: function () {

        if (gameStart = true) {
            keyT.onDown.add(mainState.toggleControls, this);
        }

        keyS.onDown.add(mainState.createShape, this);
        keyR.onDown.add(mainState.rotateShape, this);

        this.game.physics.arcade.collide(player, tetromino);
        //this.game.physics.arcade.collide(tetromino);

        if (toggle == true) {
            if (cursors.left.isDown) {
                box1.body.x += -50;
            } else if (cursors.right.isDown) {
                box1.body.x += 50;
            } else if (cursors.down.isDown) {
                box1.body.y += 50;
            }

        }

        //PLAYERSETTINGS
        player.body.velocity.x = 0;

        if (toggle == false) {

            if (cursors.left.isDown) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            } else if (cursors.right.isDown) {
                player.body.velocity.x = 150;
                player.animations.play('right');
            } else {
                player.animations.stop();
                player.frame = 4;
            }
            //JUMP + "&& tetrisblok.body.touching.down"
            if (cursors.up.isDown) {
                player.body.velocity.y = -200;
            }
        }

    },

    toggleControls: function () {

        if (toggle == false) {
            toggle = true;
            console.log("toggle on");
        } else if (toggle == true) {
            toggle = false;
            console.log("toggle off");
        };
    },

    createShape: function () {

        gameStart = true;

        //BOXES
        box1 = game.add.sprite(100, 200, 'box');
        //child1 = box1.addChild(game.make.sprite(-25, -75, 'box'));
        //child2 = box1.addChild(game.make.sprite(-25, -125, 'box'));
        //child3 = box1.addChild(game.make.sprite(25, -25, 'box'));

        //child1 = box1.addChild(game.make.sprite(-25, -75, 'box'));
        //child2 = box1.addChild(game.make.sprite(-25, -125, 'box'));
        //child3 = box1.addChild(game.make.sprite(-25, -175, 'box'));

        child1 = box1.addChild(game.make.sprite(25, -75, 'box'));
        child2 = box1.addChild(game.make.sprite(-25, -125, 'box'));
        child3 = box1.addChild(game.make.sprite(25, -125, 'box'));

        box1.anchor.x = 0.5;
        box1.anchor.y = 0.5;

        box1.tint = 0xFF0000;
        //child1.tint = 0xFF0000;
        //child2.tint = 0xFF0000;
        //child3.tint = 0xFF0000;

        child1.tint = 0xFFFFFF;
        child2.tint = 0xAA0000;
        child3.tint = 0x000000;

        game.physics.arcade.enable(box1);

        box1.body.collideWorldBounds = true;
        box1.body.immovable = true;
        child1.enableBody = true;
        child2.enableBody = true;
        child3.enableBody = true;

        tetromino.add(box1);

    },

    chooseShape: function(shape) {

    },

    rotateShape: function () {
        box1.angle += 90;
    }
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');