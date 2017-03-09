
var Menu = {};
var textWidth = 0;
var min = 1;

var title;
var start;
var isOpen = false;

Menu.preload = function(){
    // load font
    game.load.script('classic-arcade', 'js/webfontloader.js');
    
    title = {
        font: '75px arcade', color: '#ffffff',
        fill: '#ffffff',
        align: 'center'
    };

    start = {
        font: '38px arcade', color: '#ffffff',
        fill: '#ffffff',
        align: 'center'
    };

    //adri's scale to device (credit to enzo bby)
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    // load the fonts here for use in the different game states
    game.load.bitmapFont('gameover', 'assets/fonts/gameover.png', 'assets/fonts/gameover.fnt');
    game.load.bitmapFont('videogame', 'assets/fonts/videogame.png', 'assets/fonts/videogame.fnt'); // converted from ttf using http://kvazars.com/littera/
    game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    game.load.spritesheet('button', 'assets/start.png', 201, 71);
    game.load.audio('music','assets/sound/tetris.mp3'); // load music now so it's loaded by the time the game starts

    //adri's code for main menu
    game.load.spritesheet('joystick','assets/joysticks_loop.png', 200,200)

    game.load.spritesheet('knopA','assets/knop_a_in_kleur_loop.png', 100,100)
    game.load.spritesheet('knopB','assets/knop_b_in_kleur_loop.png', 100,100)
    
    // load background image by Yawuar
    game.load.image('bg', 'assets/background.jpg');

    // load player
    game.load.spritesheet('dude', 'assets/charv03.png', 50, 64);

    // load door
    game.load.spritesheet('door','assets/door_spritesheet.png', 60,64)

    // load settings btn
    game.load.image('settings', 'assets/settings.png');
    
    

    //end code
};

Menu.create = function(){
    placeSeparators();
    //startButton(1);
    //commented out by adri & code by adri
    //document.getElementById('keys').style.display = "flex";
    //document.getElementById('cup').style.display = "block";

    var bg = game.add.tileSprite(0, 0, 768, 1344, 'bg');
    var differWidth = game.world.width / bg.width;
    var differHeight = game.world.height / bg.height;
    bg.scale.setTo(differWidth, differHeight);
    bg.alpha = 0.2;

    // check if game is pressed and start game
    game.input.onDown.add(chooseLevel, this);
    // title
    game.add.text(game.world.width / 2 - 165, game.world.height / 2 - 123, "tetris\nplatform", title);
    // press to start

    game.add.text(game.world.width / 2 - 135.5, game.world.height - 100, "press  to  start", start);

    var settings = game.add.sprite(game.world.width - 70, 15, 'settings');
    settings.scale.setTo(0.7);

    door = game.add.sprite(game.world.width /2 - 40, game.world.height /2 + 70, 'door');
    game.physics.arcade.enable(door);
    door.scale.setTo(1.4);
    door.frame = 0;

    player = game.add.sprite(-50, game.world.height / 2 + 96, 'dude');
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(player);

    door.animations.add('open', [0,1,2,3,4,5,6,7,8,9], 10, false);
    door.animations.add('close', [9, 8, 7, 6, 5, 4, 3, 2, 1, 0], 20, false);
    
    //end code
};

Menu.shutdown = function(){
    document.getElementById('keys').style.display = "none";
};

Menu.update = function() {

    player.body.velocity.x = 100;
    player.animations.play('right');
    runPlayer();
    //player.body.position.x = -50;

}

function runPlayer() {
    
    if(Math.ceil(player.body.position.x) >= game.world.width / 2 - 25) {
        player.body.velocity.x = 0;
        player.animations.stop();
        player.frame = 4;
        min -= 0.02;
        if(min > 0) {
            player.alpha = min;
        } else {
            min = 1;
            player.body.position.x = -50;
            player.alpha = min;
            isOpen = false;
            door.animations.play('close');
        }
    }

    if(Math.ceil(player.body.position.x) >= game.world.width / 6 && !isOpen) {
        isOpen = true;
        door.animations.play('open');
    }
}

// maps keyboard charcodes to more readable literals
Menu.keyMaps = {
    13 : "ENTER",
    32 : "SPACEBAR",
    37 : "LEFT",
    38 : "UP",
    39 : "RIGHT",
    40 : "DOWN"
    // The list is far from exhaustive, the goal is mainly practice
};

// The default set of keys to propose to the player on the menu screen
Menu.defaultKeys = {
    rotateleft : "W",
    rotateright : "X",
    pause : "SPACEBAR",
    moveleft : "LEFT",
    moveright : "RIGHT",
    movedown : "DOWN"
};

// When a key is pressed in one of the input fields of the menu screen, change the value of the field to the literal
// corresponding to the pressed key
Menu.updateKey = function(evt,id) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    // Letters (which have codes above 40 already have literas stored in charCode ; the others need to get it from keyMaps
    var charStr = (charCode <= 40) ? this.keyMaps[charCode] : String.fromCharCode(charCode);
    // If the user typed a key for which we have not provided a literal
    if(typeof charStr === 'undefined'){
        charStr = this.defaultKeys[id];
    }
    document.getElementById(id).value = charStr;
};