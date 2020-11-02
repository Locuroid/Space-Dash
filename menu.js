function menuPreload() {

    //Load the player skins
    game.load.spritesheet('player', 'assets/players/robot_blue.png', 114, 114);
    game.load.spritesheet('chimp', 'assets/players/chimp.png', 114, 114);
    game.load.spritesheet('astro', 'assets/players/astronaut_red.png', 114, 114);

    //Load image for enemies
    game.load.spritesheet('enemy1', 'assets/enemies/bat.png' , 114, 114);
    game.load.spritesheet('enemy2', 'assets/enemies/chomper.png' , 114, 114);
    game.load.spritesheet('enemy3', 'assets/enemies/zombie.png' , 114, 114);
    game.load.spritesheet('ZaggerEnemy', 'assets/enemies/ghost.png', 114, 114);
    game.load.spritesheet('rawrEnemy', 'assets/enemies/octopus.png', 114, 114);
    game.load.spritesheet('swiftEnemy', 'assets/enemies/mine.png', 114, 114);
    game.load.image('warning', 'assets/ui/warning.png');

    //Load the background
    game.load.image('background', 'assets/backgrounds/background3.png');
    game.load.image('shopBackground', 'assets/backgrounds/background4.png');

    //Load our font
    game.load.bitmapFont('font', 'assets/fonts/font5.png', 'assets/fonts/font5.fnt');

    //Load the image for coins
    game.load.image('coin', 'assets/pickups/coin1.png');

    //Load the images for our powerups
    game.load.image('shield', 'assets/pickups/powerup2.png');
    game.load.image('magnet', 'assets/pickups/powerup1.png');
    game.load.image('boom', 'assets/pickups/powerup3.png');

    //Load the image for our explosion
    game.load.image('explode', 'assets/effects/laserRed04.png');

    //Load the audio for our game
    game.load.audio('mainMusic', 'assets/music/Level2.mp3');
    game.load.audio('coinSound', 'assets/soundFX/coin1.mp3');
    game.load.audio('lose', 'assets/soundFX/WarpJingle.mp3');
    game.load.audio('blowUp', 'assets/soundFX/fire.mp3');

    //Load buttons
    game.load.image('button', 'assets/ui/blankButton.png');
    game.load.image('back', 'assets/ui/back.png');
    game.load.image('lock', 'assets/ui/lock.png');


}

function menuCreate() {

  //Register our state
  game.state.add('menu', menuState);
  game.state.add('game', gameState);
  game.state.add('shop', shopState);

  //Scale the game
  game.scale.setUserScale(window.innerWidth/960, window.innerHeight/640);
  game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

  //Make the background
  game.menuBackground = game.add.tileSprite(0, 0, 960, 640, 'background');

  //Create the title text
  var menuText = game.add.bitmapText(game.world.centerX, 175, 'font', 'Space Dash');
  menuText.anchor.setTo(0.5, 0.5);
  menuText.scale.setTo(2.5, 2.5);

  //Create a play button
  var playButton = game.add.button(game.world.centerX, game.world.centerY, 'button',
    function() {
      game.state.start('game');
    }
  );
  playButton.anchor.setTo(0.5, 0.5);
  var playButtonText = game.add.bitmapText(playButton.x, playButton.y - 10, 'font', 'PLAY');
  playButtonText.anchor.setTo(0.5, 0.5);
  playButtonText.scale.setTo(1.25, 1.25);

  //Create some credits text
  var creditsText = game.add.bitmapText(600, 550, 'font', 'Pomegranate\nGames');
  creditsText.scale.setTo(0.75, 0.75);
  creditsText.align = 'center';

  //Create the skin list
  if(!localStorage.getItem('spaceDashSkinList'))
  {
  //                 0     1      2
  game.skinList = [true, false, false];
  }
  else {
    game.skinList = JSON.parse(localStorage.getItem('spaceDashSkinList'));
  }

  game.currentSkin = 'player';

}

function menuUpdate() {

  //Make the background move
  game.menuBackground.tilePosition.x -= 2;

}
