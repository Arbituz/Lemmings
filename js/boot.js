//boot.js
var Candy = {};
Candy.Boot = function(game){};
Candy.Boot.prototype = {
  create: function() {
    // set scale options
    this.input.maxPointers = 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.PageAlignHorizonally = true;
    this.scale.PageAlignVertically = true;
    //start the preloader state
    this.state.start('Preloader');
  }
};
