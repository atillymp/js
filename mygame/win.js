class win extends Phaser.Scene {
  constructor() {
    super("win");
  }

  preload() {
    // Load your win image (change file name if needed)
    this.load.image("winScreen", "assets/win.png");
  }

  create() {
    console.log("*** WIN SCENE ***");

    // Show the win image fullscreen
    this.add.image(0, 0, "winScreen").setOrigin(0, 0);

    // Press ENTER (or SPACE) to restart the game
    let enterKey = this.input.keyboard.addKey("ENTER");

    enterKey.on("down", () => {
      window.heart  = 3;
      window.bottle = 0;
      window.glove  = 0;
      window.needle = 0;
      window.hasWon = false;

      this.scene.start("world");
    });
  }
}
