// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(1080, 1920);

var toggle = false;

// Create the state that will contain the whole game
var mainState = {
    //Preload verhuizen naar andere gamestate
    preload: function() {
        
        game.load.spritesheet('character', 'assets/dude.png', 32, 48);
        game.load.image('box', 'assets/blokje 3.jpg');
        game.load.image('background', 'assets/background.jpg');
        keyW = game.input.keyboard.addKey(Phaser.Keyboard.T);
        keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
        
    },

    // The game objects and the game itself is created here
    create: function() {
        
        game.add.sprite(0, 0, 'background');
        
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        player = game.add.sprite(0,0, 'character');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.scale.setTo(2,2);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
        cursors = game.input.keyboard.createCursorKeys();
        
        //Boxes
        box1 = game.add.sprite(100,200,'box');
        child1 = box1.addChild(game.make.sprite(0,-50,'box'));
        child2 = box1.addChild(game.make.sprite(0,-100,'box'));
        child3 = box1.addChild(game.make.sprite(50,0,'box'));
        
        box1.tint = 0xFF0000;
        child1.tint = 0xFF0000;
        child2.tint = 0xFF0000;
        child3.tint = 0xFF0000;
        
        game.physics.arcade.enable(box1);
   
        box1.body.collideWorldBounds = true;
        box1.body.immovable = true;
        child1.body.immovable = true;
        child2.body.immovable = true;
        child3.body.immovable = true;
        
    },

    // Update runs 60 frames/sec
    update: function() {
        
        keyW.onDown.add(mainState.toggleControls,this);
        keyS.onDown.add(mainState.createShape,this);
        
        this.game.physics.arcade.collide(player, [box1,child1,child2,child3]);
        this.game.physics.arcade.collide([box1,child1,child2,child3]);
        
        //Sliding
        player.body.velocity.x = 0;
        box1.body.velocity.x = 0;
        box1.body.velocity.y = 0;
        
        if (toggle == false){
            
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
                player.body.velocity.y = -200;
            }
            
        }
        else if (toggle == true){
            
            if (cursors.left.isDown)
            {
                box1.body.velocity.x = -600;
            }
            else if (cursors.right.isDown)
            {
                box1.body.velocity.x = 600;
            }
            else if(cursors.down.isDown)
            {
                box1.body.velocity.y = 600;
            }
            
        }
        
    },
    
    toggleControls: function() {
        
        if(toggle == false)
        {
            toggle = true;
            console.log("toggle on");
        }
        else if (toggle == true)
        {
            toggle = false;
            console.log("toggle off");
        };
    },
    
    createShape: function(){
    
        //BOXES
        box1 = game.add.sprite(100,200,'box');
        child1 = box1.addChild(game.make.sprite(0,-50,'box'));
        child2 = box1.addChild(game.make.sprite(0,-100,'box'));
        child3 = box1.addChild(game.make.sprite(50,0,'box'));
        
        box1.tint = 0xFF0000;
        child1.tint = 0xFF0000;
        child2.tint = 0xFF0000;
        child3.tint = 0xFF0000;
        
        game.physics.arcade.enable(box1);
   
        box1.body.collideWorldBounds = true;
        box1.body.immovable = true;
        child1.body.immovable = true;
        child2.body.immovable = true;
        child3.body.immovable = true;
    
    }
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
