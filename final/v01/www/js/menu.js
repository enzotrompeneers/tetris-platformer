/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */


var Menu = {};

Menu.preload = function(){
    // load the fonts here for use in the different game states
    game.load.bitmapFont('gameover', 'assets/fonts/gameover.png', 'assets/fonts/gameover.fnt');
    game.load.bitmapFont('videogame', 'assets/fonts/videogame.png', 'assets/fonts/videogame.fnt'); // converted from ttf using http://kvazars.com/littera/
    game.load.bitmapFont('desyrel', 'assets/fonts/desyrel.png', 'assets/fonts/desyrel.xml');
    game.load.spritesheet('button', 'assets/start.png', 201, 71);
    game.load.audio('music','assets/sound/tetris.mp3'); // load music now so it's loaded by the time the game starts
};

Menu.create = function(){
    var welcome = game.add.bitmapText(game.world.centerX, 100, 'gameover', 'WELCOME',64);
    welcome.anchor.setTo(0.5);
    placeSeparators();
    startButton(1);
    //document.getElementById('keys').style.display = "flex";
    //document.getElementById('cup').style.display = "block";
};

Menu.shutdown = function(){
    document.getElementById('keys').style.display = "none";
    document.getElementById('cup').style.display = "none";
};

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