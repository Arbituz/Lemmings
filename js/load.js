//load.js

var loadState = {
  preload: function() {
    var loadingLabel = game.add.text(80, 150, 'loading...', {font: '30px courier', fill: '#ffffff'});

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.PageAlignHorizonally = true;
    game.scale.PageAlignVertically = true;
    game.stage.backgroundColor = '#000000';

    //load JSON files
    game.load.tilemap('level', 'assets/maps/level001.json', null, Phaser.Tilemap.TILED_JSON);

    //load sprites
    game.load.image('layer', 'assets/sprites/world.png');
    game.load.spritesheet('lemming', 'assets/sprites/lemming.png', 16, 16);
    game.load.spritesheet('wall', 'assets/sprites/wall.png', 16, 16);

  },

  create: function() {
    game.state.start('title');
  }
};
