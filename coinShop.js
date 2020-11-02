function shopPreload() {

}

function shopCreate() {

  //Add a shop background
  var background = game.add.sprite(0, 0, 'shopBackground');

  //Add the shop text
  var title = game.add.bitmapText(game.world.centerX, 100, 'font', 'SPACE SHOP');
  title.anchor.setTo(0.5, 0.5);
  title.scale.setTo(2, 2);

  //Add a back button
  var backButton = game.add.button(25, 25, 'back',
    function() {
      //Go back to the game
      game.state.start('game');
    }
  );

  //Add the coin amount
  game.coinScoreText = game.add.bitmapText(960-25, 25, 'font', 'coins');
  game.coinScoreText.anchor.setTo(1,0);

  //Create the skins
  var robot = new Skin(200, 400, 'player', 'ROBOT', 0, 0);
  var chimp = new Skin(400, 400, 'chimp', 'MONKEY', 10, 1);
  var astro = new Skin (625, 400, 'astro', 'ASTRO', 500, 2);

}

function shopUpdate() {

  //Update the coin score text
  game.coinScoreText.text = 'Coins ' + game.coinScore.toString();

}

/*########################
      Skin constructor
########################*/
function Skin(x, y, image, name, price, id) {

  //Run the sprite code
  Phaser.Sprite.call(this, game, x, y, image);
  //Add the sprite to the game
  game.add.existing(this);
  //Set the anhor point
  this.anchor.setTo(0.5, 0.5);

  //Set the name of the constructor
  this.nameText = game.add.bitmapText(this.x, this.y + 75, 'font', name);
  this.nameText.anchor.setTo(0.5, 0.5);
  this.nameText.scale.setTo(0.75, 0.75);

  //Set the price
  this.price = price;

  //Figure out if it's already been purchased
  this.purchased = game.skinList[id];

  //If the skin has not been purchased
  if(!this.purchased)
  {
    this.lock = game.add.sprite(this.x, this.y, 'lock');
    this.lock.anchor.setTo(0.5, 0.5);

    //Add the price text
    this.priceText = game.add.bitmapText(this.x, this.y + 100, 'font', this.price.toString());
    this.priceText.anchor.setTo(0.5, 0.5);
    this.priceText.scale.setTo(0.75, 0.75);


  }
  //Create image variables
  this.skinImage = image;
  this.id = id

  //Handle input
  this.inputEnabled = true;
  this.events.onInputDown.add(this.click, this);




}
Skin.prototype = Object.create(Phaser.Sprite.prototype);

Skin.prototype.click = function() {

  if(this.purchased)
  {
    game.currentSkin = this.skinImage;
  }
  //If the skin is not yet purchased
  else {
    if(game.coinScore >= this.price)
    {
      //Subtract the coins
      game.coinScore -= this.price;
      //Destroy the lock
      this.lock.destroy();
      //Destroy the price text
      this.priceText.destroy();
      //Set the purchased variable to true
      this.purchased = true;
      //Update the skin list
      game.skinList[this.id] = true;
      //Save the game
      saveGame();

    }
  }

};















































//Hello
