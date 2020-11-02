//Spawn random enemy
function spawnEnemy() {

  var x = 1000;
  var y = game.rnd.between(50, 600);
  var speed = game.rnd.between(4, 10);
  var image = 'enemy' + game.rnd.between(1,3);
  var enemyType = game.rnd.between(1, 100);

  //Spawn enemies
  if(enemyType < 50)
  {
    var enemy = new Enemy(x, y, speed, image);
  }
  else if(enemyType < 80)
  {
    var zag = new Zagger(x, y, speed);
  }
  else if(enemyType < 90)
  {
    var rawr = new Rawr(x, y, speed);
  }
  else
  {
  var swift = new Swift(y);
  }

  //Set a timer
  var time;

  if(game.score < 15)
  {
    time = 3000;
  }
  else if(game.score < 30)
  {
    time = 2500;
  }
  else if(game.score < 45)
  {
    time = 2000;
  }
  else if(game.score < 60)
  {
    time = 1500;
  }
  else {
    time = 1000;
  }

  game.time.events.add(time, spawnEnemy, this);

}

//Checks if objects have collided
function checkCollision(object1, object2) {

  var distance = Phaser.Math.distance(object1.x, object1.y, object2.x, object2.y);

  if(distance <= object1.size + object2.size)
    {
      return true;
    }
    else {
        return false;
    }
}

//End the game and show game over text
function gameOver() {

  //Turn the background red
  game.background.tint = 0xFF0000;

  //Destroy the player
  player.destroy();

  //Make the game over text visible
  game.gameOverText.visible = true;

  //MAke the shop button visible
  game.shopButton.visible = true;
  game.shopButton.text.visible = true;

  //Tell the game that it is over
  game.isGameOver = true;

  //Set the high score
  if(game.score > game.highScore)
  {
    game.highScore = game.score;
    game.highScoreText.text = 'Best ' + game.highScore;
  }

  //Play our game over soundFX
  game.lose.play();

  //Save the game data
  saveGame();

}

//Restart the screen!
function restart() {

  //Untint the screen
  game.background.tint = 0xFFFFFF;

  //Make the player
  makePlayer();

  //Make the game over text invisible
  game.gameOverText.visible = false;

  //Make the button invisible
  game.shopButton.visible = false;
  game.shopButton.text.visible = false;

  //Tell the game that it is not over
  game.isGameOver = false;

  //Reset the score to zero
  game.score = 0;

  //Destroy all enemies
  while(game.enemyGroup.length > 0)
  {
    game.enemyGroup.getTop().destroy();
  }

  //Destroy all the coins
  while(game.coinGroup.length > 0)
  {
    game.coinGroup.getTop().destroy();
  }

}

//Increase the score
function increaseScore()
{
  if(!game.isGameOver)
  //Increase the score
  game.score++;

  //Start a new timer to run this function
  game.time.events.add(500, increaseScore, this);

}

//Spawn a random coin pattern
function spawnCoins() {

  //Create a random number
  var randomNumber = game.rnd.between(1, 2);

  //Create a random y value
  var randomY = game.rnd.between(100, 550);

  if(randomNumber === 1)
  {
    game.coinSpawner.zigzag(1000, randomY);
  }

  if(randomNumber === 2)
  {
    game.coinSpawner.diamond(1000, randomY);
  }

  //Start a timer to restart this function
  game.time.events.add(5000, spawnCoins, this);

}

//Spawn a powerup
function spawnPowerup() {

  //Create random number
  var rndmY = game.rnd.between(50, 590);
  var rndmPwrp = game.rnd.between(1, 3);

  //Spawn the powerup
  if(rndmPwrp === 1)
  {
    var shield = new Shield(1000, rndmY);
  }
  if(rndmPwrp === 2)
  {
    var cnMagnet = new CoinMagnet (1000, rndmY);
  }
  if(rndmPwrp === 3)
  {
    var boom = new Boom(1000, rndmY);
  }
  //Create a random variable for time
  var time = game.rnd.between(10000, 15000);

  //Start a new timer
  game.time.events.add(time, spawnPowerup, this);

}

//Save all the game data
function saveGame() {

  localStorage.setItem('spaceDashHighScore', game.highScore);
  localStorage.setItem('spaceDashCoinScore', game.coinScore);
  localStorage.setItem('spaceDashSkinList', JSON.stringify(game.skinList));

}
































//Delete this
