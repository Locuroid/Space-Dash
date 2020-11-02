var gameState = {preload: preload, create: create, update: update};
var menuState = {preload: menuPreload, create: menuCreate, update: menuUpdate};
var shopState = {preload: shopPreload, create: shopCreate, update: shopUpdate};

//This first line creates our game object.
var game = new Phaser.Game(960, 640, Phaser.AUTO, 'game', menuState);
var player;

//Load all of your textures and sounds
function preload() {

}

//Do all of your initial setup
function create() {

  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  //Create the audio objects
  game.mainMusic = game.add.audio('mainMusic');
  game.coinSound = game.add.audio('coinSound');
  game.lose = game.add.audio('lose');
  game.blowUpSound = game.add.audio('blowUp');


  //Play the main game mainMusic
  game.mainMusic.play('', 0, 0.4, true);

  //Create the background
  game.background = game.add.tileSprite(0, 0, 960, 640, 'background');

  //Create our groups
  game.enemyGroup = game.add.group();
  game.coinGroup = game.add.group();

//Create the player
makePlayer();

//Spawn coins
spawnCoins();

//Game over text
game.gameOverText = game.add.bitmapText(game.world.centerX, game.world.centerY, 'font', 'Game Over\n Tap to Run Again');
game.gameOverText.anchor.setTo(0.5, 0.5);
game.gameOverText.align = 'center';
game.gameOverText.visible = false;

//Shop button
game.shopButton = game.add.button(game.world.centerX, game.world.centerY + 150, 'button',
    function() {
      game.state.start('shop');
      game.mainMusic.stop();
    }
  );
  game.shopButton.anchor.setTo(0.5, 0.5);
  game.shopButton.text = game.add.bitmapText(game.shopButton.x, game.shopButton.y - 10, 'font', 'SHOP');
  game.shopButton.text.anchor.setTo(0.5, 0.5);
  game.shopButton.visible = false;
  game.shopButton.text.visible = false;

//Create score
game.score = 0;
game.scoreText = game.add.bitmapText(25, 25, 'font', 'Score');
increaseScore();

//Create the High-Score
if(!localStorage.getItem('spaceDashHighScore'))
{
  game.highScore = 0;
}
else {
  game.highScore = localStorage.getItem('spaceDashHighScore')
}
game.highScoreText = game.add.bitmapText(25, 60, 'font', 'Best ' + game.highScore.toString());
game.highScoreText.scale.setTo(0.75, 0.75);

//Create the coin score
if(!localStorage.getItem('spaceDashCoinScore'))
{
  game.coinScore = 0;
}
else {
  game.coinScore = localStorage.getItem('spaceDashCoinScore')
}
game.coinScoreText = game.add.bitmapText(960-25, 25, 'font', 'coins');
game.coinScoreText.anchor.setTo(1,0);

//Spwan our enemies
spawnEnemy();

//Spawn our powerups
spawnPowerup();


}

//Write all of your continuous game logic here
function update() {

  //Move background
  game.background.tilePosition.x -= 4;

  //Restart the game
  if(game.input.activePointer.justPressed() && game.isGameOver)
  {
    restart();
  }

  //Update the score
  game.scoreText.text = 'Score ' + game.score.toString();

  //Update the coin score
  game.coinScoreText.text = 'coins ' + game.coinScore.toString();

  //Update all of the effects
  effects.update();

}





































//Hello
