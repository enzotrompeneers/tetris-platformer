var game = new Phaser.Game(800, 600);

var currentX = 0;

var mainState = {
    preload: function() {
        game.load.spritesheet('char', 'assets/charv03.png', 50, 64);
    },

    create: function() {
        currentX = game.input.activePointer.x;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        player = game.add.sprite(32, game.world.height - 64, 'char');


        game.physics.arcade.enable(player);

        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    },

    update: function() {
        var direction = this.swipe.check();
        if(game.input.activePointer.isDown) {
            var left = game.input.activePointer.x;
            var pos = left - currentX;
            if(pos < 0) {
                player.body.velocity.x = -150;
                player.animations.play('left');
            }

            if(pos > 0){
                player.body.velocity.x = 150;
                player.animations.play('right');
            } else {

            }
            // set the current X value to the left value
            currentX = left;

        } else if(game.input.activePointer.isUp) {
            player.animations.stop();
            player.frame = 4;
            player.body.velocity.x = 0;
        }
    }
};

game.state.add('main', mainState);

game.state.start('main');