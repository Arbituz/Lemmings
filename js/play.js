//play.js

var lemmingSpawn_CONST = 10;
var lemmingSpeed = 30;
var lemmings;

var playState = {



  create: function() {

    //set gravity
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 500;

    //display tiles for maps
    var map = game.add.tilemap('level');
    map.addTilesetImage('world', 'layer');
    layer = map.createLayer('Tile Layer 1');
    map.setCollisionBetween(0, 2000, true, 'Tile Layer 1');

    //setup collidable walls
    walls = game.add.group();
    wall = map.createFromObjects('Object Layer 1', 6, 'wall', 0, true, false, walls);
    game.physics.enable(walls, Phaser.Physics.ARCADE);
    walls.setAll('body.allowGravity', false);
    walls.setAll('body.immovable', true);
    walls.setAll('visible', false);
    walls.setAll('anchor.setTo', 0.5, 0.5);

    //setup lemmings group and assign properties
    lemmings = game.add.group();
    lemmings.enableBody = true;
    lemmings.physicsBodyType = Phaser.Physics.ARCADE;
    lemmings.inputEnableChildren = true;

    //lemming = game.time.events.repeat(Phaser.Timer.SECOND * 2, lemmingSpawn_CONST, spawnLemming, this);

    //function spawnLemming() {
      for(i = 0; i < 10; i++) {
        lemming = lemmings.create(66, -16, 'lemming');
        lemming.name = 'lemming' + i;
        lemming.body.velocity.x = lemmingSpeed;
      }
  //  return lemming;
  //  }

    lemmings.onChildInputDown.add(onDown, this);

    function onDown(sprite) {
      sprite.tint = 0x00ff00;
      console.log(lemming.name);
    }

  },

  update: function() {

    game.physics.arcade.collide(lemmings, walls, wallCollide, null, this);

    function wallCollide(lemmings, walls) {
      if(lemmings.body.touching.right) {
        lemmings.body.velocity.x = -lemmingSpeed;
      }
      else if(lemmings.body.touching.left) {
        lemmings.body.velocity.x = lemmingSpeed;
      }
      if(lemmings.body.touching.down) {

      }
    }

  },

  render: function() {

    //game.debug.pointer(game.input.activePointer);
    game.debug.body(lemming);
    game.debug.body(layer);
    game.debug.body(walls);

  }

};
