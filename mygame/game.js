// game.js  (ONLY config + game object here)

var config = {
  type: Phaser.AUTO,
  // pixel size * tile map size (change if you want)
  width: 32 * 40,
  height: 32 * 40,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: "#000000",
  pixelArt: true,
  // put all your scenes here
  scene: [main, world, world2, world3, showInventory]
};

var game = new Phaser.Game(config);
