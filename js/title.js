//title.js

var titleState = {
  create: function() {

    var nameLabel = game.add.text(325, 390, 'Press Space to continue...', {
      font: '14px Arial', fill: '#ffffff'
    });

    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  },

  update: function() {
    //if (spaceBar.isDown) {
      game.state.start('play')
    //}
  }
};
