//play.js

Candy.Game = function(game) {
  //define needed variables for Candy.Game
  this._lemmings = null;
  this._lemmingsGroup = null;
  this._spawnLemmingsTimer = 0;
  this._wallGroup = null;
  this._wall = null;
  this._lemmingSPAWN = 10;
};

Candy.Game.prototype = {

  create: function() {

    //start the physics system and set gravity
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.y = 500;

    // initialize the spawn timer
    this._spawnLemmingsTimer = 0;

    //create groups
    this._lemmingsGroup = this.add.group();
    this._wallGroup = this.add.group();

    //spawn first lemming
    Candy.lemmings.spawnLemming(this);

    //display tiles for maps
    var map = this.add.tilemap('level');
    map.addTilesetImage('world', 'layer');

    var layer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(0, 2000, true, 'Tile Layer 1');

    //create wall from Tiled
    var wall = map.createFromObjects('Object Layer 1', 6, 'wall', 0, true, false, this._wallGroup);

    //enable physics for wallGroup
    this.physics.enable(this._wallGroup, Phaser.Physics.ARCADE);

    this._wallGroup.forEach(function(wall) {
      wall.enableBody = true;
      wall.anchor.setTo(0.5, 0.5);
      wall.body.immovable = true;
      wall.body.allowGravity = false;
    })

  },

  update: function() {

    this.physics.arcade.collide(this._lemmingsGroup, this._wallGroup, Candy.lemmings.wallCollide, null, this);

    //only spawn the predetermined number of lemmings
    if(this._lemmingsGroup.length < this._lemmingSPAWN) {
      //update timer every frame
      this._spawnLemmingsTimer += this.time.elapsed;

      //if spawn timer reaches two seconds (2000 miliseconds)
      if(this._spawnLemmingsTimer > 2000) {
        //reset it
        this._spawnLemmingsTimer = 0;
        //and spawn a lemming!
        Candy.lemmings.spawnLemming(this);
      }
    }
  },

  render: function() {

  }
};

Candy.lemmings = {
  spawnLemming: function(game) {

    //create new lemmings
    var lemming = game.add.sprite(66, -16, 'lemming');

    //enable body for lemmings
    game.physics.enable(lemming, Phaser.Physics.ARCADE);

    //enable lemmings to be clicked/tapped
    lemming.inputEnabled = true;

    //set anchor (for rotation, position etc) to middle of lemmings
    lemming.anchor.setTo(0.5, 0.5);

    //set velocity
    lemming.body.velocity.x = 20;

    //add lemming to the lemmings group
    game._lemmingsGroup.add(lemming);

  },

    wallCollide: function(lemming) {
      if(lemming.body.touching.right) {
        lemming.body.velocity.x = -15;
      }
      else if(lemming.body.touching.right) {
        lemming.body.velocity.x = 15;
      }
    }
};
