function makePlayer() {

  player = game.add.sprite(100, 200, game.currentSkin);
  player.size  = 40;
  player.anchor.setTo(0.5, 0.5);

  //Create the movement variables
  player.speed = 0;
  player.maxSpeed = 7;
  player.acc = 0.5;

  player.update = function() {

    //If mouse button is down
    if(game.input.activePointer.isDown)
    {
      this.frame = 0;
      //accelerate up
      if(this.speed > -this.maxSpeed)
      {
      this.speed -= this.acc;
      }
    }
      //If mouse button is up
    else {
      this.frame = 1;
      //accelerate down
      if(this.speed < this.maxSpeed)
      {
      this.speed += this.acc
      }
    }
    //Move the player
    this.futureY = this.y + this.speed;
    if(this.futureY > 50 && this.futureY < 590)
    {
    this.y += this.speed;
    }
    else {
      this.speed = 0;
    }

  };

  //Give the player a shield
  player.shield = function() {

    //Tint the player
    this.tint = 0x00FF00;

    //Set the safe value to true
    this.safe = true;

  };

  player.stopShield = function() {

    //Stop the tint
    this.tint = 0xFFFFFF;

    //Set the safe value
    this.safe = false;
  };

  //Activate the magnet power
  player.magnet = function() {

    //Make the player transparent
    this.alpha = 0.5;

    //Set the magnetic value to true
    this.magnetic = true;

    //Start a new timer
    game.time.events.add(10000, this.stopMagnet, this);

  };

  //Stop the magnet power
  player.stopMagnet = function() {

  //Make the player opaque
  this.alpha = 1;

  //Turn off the magnettic boolean
  this.magnetic = false;

  };
}



































//Hello
