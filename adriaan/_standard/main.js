// If you make use of this template setup file or any of the other files in this template project, please link my github profile @RobLui.

// Init the game
var game = new Phaser.Game(600, 400);

// Create the state that will contain the whole game
var mainState = {
    // Preload the assets (.png, .wav, ..)
    preload: function() {
        //
    },

    // The game objects and the game itself is created here
    create: function() {
        //
    },

    // Update runs 60 frames/sec
    update: function() {
        //
    },
};

// Add the mainState
game.state.add('main', mainState);
// Start the game
game.state.start('main');
