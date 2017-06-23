//play.js
  var lemmingAction = null;
Candy.Game = function(game) {
  //define needed variables for Candy.Game
  this._lemmings = null;
  this._lemmingsGroup = null;
  this._spawnLemmingsTimer = 0;
  this._wallGroup = null;
  this._wall = null;
  this._lemmingSPAWN = 10;
  this._kill = false;
  this._lemmingsAlive = null;
  this._lemmingsAliveCount = null;
  this._exitGroup = null;
  this._lemmingSpeed = 30;
  this._actionSelected = 'None';
  this._lemmingsSaved = 0
  this._lemmingsSavedText
};

Candy.Game.prototype = {

  create: function() {

    //start the physics system and set gravity
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // initialize the spawn timer
    this._spawnLemmingsTimer = 0;

    //create groups
    this._lemmingsGroup = this.add.group();
    this._wallGroup = this.add.group();
    this._exitGroup = this.add.group();

    //spawn first lemming
    Candy.lemmings.spawnLemming(this);

    // Add the initial number of lemmings in the group
    this._lemmingsAlive = this._lemmingsGroup.length;

    //display tiles for maps
    var map = this.add.tilemap('level');
    map.addTilesetImage('world', 'layer');

    var layer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(0, 2000, true, 'Tile Layer 1');

    //create wall from Tiled
    var wall = map.createFromObjects('Wall Layer', 6, 'wall', 0, true, false, this._wallGroup);
    var exit = map.createFromObjects('Exit Layer', 17, 'wall', 0, true, false, this._exitGroup);

    //configure wall group
    this.physics.enable(this._wallGroup, Phaser.Physics.ARCADE);

    this._wallGroup.forEach(function(wall) {
      wall.enableBody = true;
      wall.body.immovable = true;
      wall.body.allowGravity = false;
      wall.visible = true;
    })

    //configure exit group
    this.physics.enable(this._exitGroup, Phaser.Physics.ARCADE);

    this._exitGroup.forEach(function(exit) {
      exit.enableBody = true;
      exit.body.immovable = true;
      exit.body.allowGravity = false;
      exit.visible = false;
    })

    //print the number of lemmings alive to the screen
    this._lemmingsAliveCount = this.add.text(600, 420, 'Lemmings: ' + this._lemmingsAlive, {font: '14px Arial', fill: '#ffffff'});
    this._lemmingsSavedText = this.add.text(600, 440, 'Lemmings Saved: ' + this._lemmingsSaved, {font: '14px Arial', fill: '#ffffff'});
    this._actionSelected = this.add.text(20, 440, 'Action Selected: None', {font: '14px Arial', fill: '#ffffff'});

    //buttons
    this._buttonParachute = this.add.button(20, 380, 'button_parachute', Candy.buttons.parachute, this, 2, 1, 0);
    this.add.button(0, 0, 'button_tunnel', Candy.buttons.tunnel, this, 2, 1, 0).alignTo(this._buttonParachute, Phaser.RIGHT_CENTER, 16);

  },

  update: function() {

    this.physics.arcade.collide(this._lemmingsGroup, this._wallGroup, Candy.lemmings.wallCollide, Candy.lemmings.fallCheck, this);
    this.physics.arcade.overlap(this._lemmingsGroup, this._exitGroup, Candy.lemmings.exit, null, this);

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
        //update text with number of lemmings alive
        this._lemmingsAlive += 1;
        this._lemmingsAliveCount.setText('Lemmings: ' + this._lemmingsAlive);
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

    lemming.tunnel = false;

    //allow gravity
    lemming.body.allowGravity = true;

    //enable lemmings to be clicked/tapped
    lemming.inputEnabled = true;

    //add event listener to click/tapped
    lemming.events.onInputDown.add(this.onClick, this);

    //set anchor (for rotation, position etc) to middle of lemmings
    lemming.anchor.setTo(0.5, 0.5);

    //set velocity
    lemming.body.velocity.x = game._lemmingSpeed;

    //set gravity
    lemming.body.gravity.y = 500;

    //add lemming to the lemmings group
    game._lemmingsGroup.add(lemming);

    game.world.bringToTop(game._lemmingsGroup);

  },

  wallCollide: function(lemming, wall) {
    //see if the lemming has been given "tunneling" powers
    if(lemming.tunnel == true) {
      if(lemming.body.touching.right) {
        wall.destroy();
        lemming.body.velocity.x = 30;
      }
      else if(lemming.body.touching.left) {
        wall.destroy();
        lemming.body.velocity.x = -30;
      }
    }
    else {
      if(lemming.body.touching.right) {
        lemming.body.velocity.x = -30;
      }
      else if(lemming.body.touching.left) {
        lemming.body.velocity.x = 30;
      }
    }
  },

  fallCheck: function(lemming) {
    if(lemming.body.velocity.y > 300) {
      lemming.kill();
      //update text with number of lemmings alive
      this._lemmingsAlive -= 1;
      this._lemmingsAliveCount.setText('Lemmings: ' + this._lemmingsAlive);
    }
  },

  onClick: function(lemming) {
    //determine what button the user selected and take action

    //Parachute
    if(lemmingAction == 'parachute') {
      if(lemming.body.gravity.y = 400) {
        lemming.body.gravity.y -= 250;
      }
    }
    //Tunneling
    if(lemmingAction == 'tunnel') {
      lemming.tunnel = true;
    }
  },

  exit: function(lemming) {
    this._lemmingsSaved += 1;
    this._lemmingsAlive -= 1;
    lemming.kill();
    this._lemmingsAliveCount.setText('Lemmings: ' + this._lemmingsAlive);
    this._lemmingsSavedText.setText('Lemmings Saved: ' + this._lemmingsSaved);
  }
};

Candy.buttons = {
  parachute: function() {
    action = 'Parachute';
    this._actionSelected.setText('Action Selected: ' + action);
    lemmingAction = 'parachute';
    return;
  },

  tunnel: function() {
    action = 'Tunnel';
    this._actionSelected.setText('Action Selected: ' + action);
    lemmingAction = 'tunnel';
    return;
  }
};
