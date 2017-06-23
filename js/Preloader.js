//load.js

Candy.Preloader = function(game) {
  //define width and height of the game
  Candy.GAME_WIDTH = 800;
  Candy.GAME_HEIGHT = 480;
};
Candy.Preloader.prototype = {
  preload: function() {
    //show loading label
    var loadingLabel = this.game.add.text(80, 150, 'loading...', {font: '30px courier', fill: '#ffffff'});

    //load JSON files
    this.game.load.tilemap('level', 'assets/maps/level001.json', null, Phaser.Tilemap.TILED_JSON);

    //load sprites
    this.game.load.image('layer', 'assets/sprites/world.png', 16, 16);
    this.game.load.spritesheet('lemming', 'assets/sprites/lemming.png', 16, 16);
    this.game.load.spritesheet('wall', 'assets/sprites/wall.png', 16, 16);
    this.game.load.image('exit', 'assets/sprites/exit.png')
    //load buttons
    this.game.load.spritesheet('button_parachute', 'assets/sprites/button_parachute.png', 32, 32);
    this.game.load.spritesheet('button_tunnel', 'assets/sprites/button_tunnel.png', 32, 32);

  },

  create: function() {
    this.state.start('MainMenu');
  }
};
