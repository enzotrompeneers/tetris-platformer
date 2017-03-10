// TODO : comments, organize code

//noinspection JSCheckFunctionSignatures,JSCheckFunctionSignatures,JSCheckFunctionSignatures
var game = new Phaser.Game(gameWidth+menuWidth, numBlocksY*blockSize+blockSize+256, Phaser.AUTO, document.getElementById('game'));
game.state.add('Menu',Menu);
game.state.add('Game',Game);
game.state.add('Level',Levels);

game.state.start('Menu');

//Place whine lines on the left and right sides of the game scene
function placeSeparators(){
    var leftSeparator = game.add.graphics(0, 0);
    leftSeparator.lineStyle(3, 0xffffff, 1);
    leftSeparator.lineTo(0,game.world.height);
    var rightSeparator = game.add.graphics(gameWidth+menuWidth-3, 0);
    rightSeparator.lineStyle(3, 0xffffff, 1);
    rightSeparator.lineTo(0,game.world.height);
}

function startGame(e){
  var getArrItem = levelsArr.indexOf(e);
  currentLevel = getArrItem + 1;
  isLevelDisabled = true;
  game.state.start('Game');
}

function loadLeaderboard(){
    game.state.start('Leaderboard');
}

function chooseLevel() {
    game.state.start('Level');
}
