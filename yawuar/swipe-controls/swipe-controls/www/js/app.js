(function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update });

    var currentX = 0;

    function preload() {
        game.load.spritesheet('char', 'assets/charv03.png', 50, 64);
    }

    function create() {
        currentX = game.input.activePointer.x;
        this.swipe = new Swipe(this.game);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        player = game.add.sprite(0, game.world.height - 64, 'char');
        game.physics.arcade.enable(player);
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

    function update() {
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

            currentX = left;

        } else if(game.input.activePointer.isUp) {
            player.animations.stop();
            player.frame = 4;
            player.body.velocity.x = 0;
        }
    }
})();