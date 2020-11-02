function Enemy(x, y, speed, image) {

//Run the sprite code
Phaser.Sprite.call(this, game, x, y, image);

//Add the object to the game
game.enemyGroup.add(this);

//Set the size for the collision
this.size = 40;

//Set the anchor point
this.anchor.setTo(0.5, 0.5);

//Add and play an animation
this.animations.add('fly');
this.animations.play('fly', 10, true);

//Set the enemy speed
this.speed = speed;

}
//Tell the enemy to inherit from the sprite
Enemy.prototype = Object.create(Phaser.Sprite.prototype);

Enemy.prototype.update = function() {

  this.x -= this.speed;

  //If we are off the screen
  if(this.x < -150)
  {
  this.destroy();
  }

  //If we hit the player
  if(checkCollision(this, player) && !game.isGameOver)
  {
    //If the player is shielded
    if(player.safe)
    {
      //Create an explosion

      for(var i = 0; i < 50; i++)
      {
        //Spawn a particle
        var particle = new ExplosionParticle(this.x, this.y, 'explode', true);
      }
      //Shake the screen
      var scrnShake = new AutoScreenShake(30, 50, true);

      player.stopShield();
      this.destroy();
      game.blowUpSound.play();
    }
    //End the game
    else {
      gameOver();
    }
  }

};

/*##############################################################################
############ THIS WILL BE CODE FOR THE ZAGGER ENEMY ############################
##############################################################################*/

function Zagger(x, y, speed) {

  //Run the regular enemy code
  Enemy.call(this, x, y, speed,'ZaggerEnemy');

}
Zagger.prototype = Object.create(Enemy.prototype);

//Zagger update function
Zagger.prototype.update = function() {

//Run the regular enemy function
Enemy.prototype.update.call(this);

//Move up and down
this.y = Math.sin(this.x * 0.01) * 225 + 300;

};

/*#############################################################################
################# This is the code for the RAWR ENEMY #########################
#############################################################################*/

function Rawr(x, y, speed) {

  //Run the regular enemy code
  Enemy.call(this, x, y, speed, 'rawrEnemy');

  //Create current speed variable
  this.ySpeed = 0;
  //Create maximum speed variable
  this.maxSpeed = 5;
  //Create acceleration variable
  this.acc = 0.1;

}
Rawr.prototype = Object.create(Enemy.prototype);

Rawr.prototype.update = function() {

  //Run the regular enemy code
  Enemy.prototype.update.call(this);

  //If we're above the player:
  if(this.y < player.y)
  {
    //If not moving at maximum speed
    if(this.ySpeed < this.maxSpeed)
    {
      //Accelerate down
      this.ySpeed += this.acc;
    }
  }
  else {
    if(this.ySpeed > -this.maxSpeed)
    {
      //Accelerate up
      this.ySpeed -= this.acc;
    }
  }
  //Move the enemy on the basis of its speed
  this.y += this.ySpeed;


};


/*###########################################################
######################## Swift Enemy ######################
###########################################################*/
function Swift(y) {

  //run the regular enemy code
  Enemy.call(this, 3000, y, 30, 'swiftEnemy');

  //Makes flashing warning sign
  this.warning = game.add.sprite(880, y, 'warning');
  this.warning.anchor.setTo(0.5, 0.5);
  this.warning.flash = function() {

    //If it's visible
    if(this.visible)
    {
      this.visible = false;
    }
    //if not visible
    else {
      this.visible = true;
    }

    //Add a new timer
    game.time.events.add(200, this.flash, this);

  };
  this.warning.flash();

  //Set a timer to destroy the warning sign
  game.time.events.add(2000,
    function () {
      this.warning.destroy();
    },
    this
  );

}
Swift.prototype = Object.create(Enemy.prototype);

Swift.prototype.update = function() {

//Run the regular enemy code
Enemy.prototype.update.call(this);

//if we are on the screen
if(this.x < 900)
{
  //Destroy the warning sign
  this.warning.destroy();
}

}
































//Hello! Delete this!
