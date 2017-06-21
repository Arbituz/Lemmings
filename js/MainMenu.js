//title.js

Candy.MainMenu = function(game) {
  var spaceBar = null;
};
Candy.MainMenu.prototype = {

  create: function() {

    var nameLabel = this.add.text(325, 390, 'Press Space to continue...', {
      font: '14px Arial', fill: '#ffffff'
    });

    this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //if (this.spaceBar.isDown) {
      this.state.start('Game');
  //  }
  }
};
