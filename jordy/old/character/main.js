// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.


//http://www.html5gamedevs.com/topic/12441-kill-sprite-when-touching-bottom-world/

var game = new Phaser.Game(1080, 1920);

var toggle = false;
var gameStart = false;

var mainState = {
    preload: function () {

        game.load.spritesheet('character', 'assets/dude.png', 32, 48);
        game.load.image('box', 'assets/blokje 3.jpg');
        game.load.image('background', 'assets/background.jpg');
        game.load.image('ground', 'assets/bottom.png');

        keyT = game.input.keyboard.addKey(Phaser.Keyboard.T);
        keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);

    },

    // The game objects and the game itself is created here
    create: function () {

        game.add.sprite(0, 0, 'background');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        player = game.add.sprite(540, 1700, 'character');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.scale.setTo(2, 2);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();

        ground = game.add.sprite(0, 1838, 'ground');
        ground.scale.x = 3;
        game.physics.arcade.enable(ground);
        ground.body.immovable = true;

        //Group with body
        tetromino = game.add.group();
        tetromino.enableBody = true;

    },

    // Update runs 60 frames/sec
    update: function () {

        keyT.onDown.add(mainState.toggleControls, this);
        keyS.onDown.add(mainState.createShape, this);

        this.game.physics.arcade.collide(player, tetromino);
        this.game.physics.arcade.collide(ground, player);
        this.game.physics.arcade.collide(ground, tetromino);
        this.game.physics.arcade.collide(tetromino);



        //Move tetris
        if (toggle == true && gameStart == true) {
            cursors.down.onDown.add(mainState.moveDown, this);
            cursors.left.onDown.add(mainState.moveLeft, this);
            cursors.right.onDown.add(mainState.moveRight, this);
            keyR.onDown.add(mainState.rotateShape, this);
        }

        //Move Player
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

        tetromino.x = 200;
        tetromino.y = 200;

        //Creating shape
        parent = tetromino.create(200, 200, 'box');
        parent.anchor.x = 0.5;
        parent.anchor.y = 0.5;
        parent.body.immovable = true;
        parent.body.collideWorldBounds = true;
        parent.tint = 0xFF0000;

        child1 = parent.addChild(tetromino.create(0, -50, 'box'));
        child1.anchor.x = 0.5;
        child1.anchor.y = 0.5;
        child1.body.immovable = true;
        child1.body.collideWorldBounds = true;
        child1.tint = 0xFF0000;

        child2 = parent.addChild(tetromino.create(0, -100, 'box'));
        child2.anchor.x = 0.5;
        child2.anchor.y = 0.5;
        child2.body.immovable = true;
        child2.body.collideWorldBounds = true;
        child2.tint = 0xFF0000;

        child3 = parent.addChild(tetromino.create(50, 0, 'box'));
        child3.anchor.x = 0.5;
        child3.anchor.y = 0.5;
        child3.body.immovable = true;
        child3.body.collideWorldBounds = true;
        child3.tint = 0xFF0000;

    },
    rotateShape: function () {
        parent.angle += 90;
    },
    moveLeft: function () {
        parent.x += -50;
    },
    moveRight: function () {
        parent.x += 50;
    },
    moveDown: function () {
        parent.y += 50;
    },

};

game.state.add('main', mainState);
game.state.start('main');