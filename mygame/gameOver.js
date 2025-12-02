class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  preload() {
    // Make sure this filename matches your actual file:
    // If your image is named "gameover.png", use that here.
    this.load.image("gameOverScreen", "assets/gameover.png");
  }

  create() {
    console.log("*** gameOver scene");

    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Background image (your designed game over screen)
    this.add
      .image(centerX, centerY, "gameOverScreen")
      .setOrigin(0.5);


    // SPACE key
    const spaceKey = this.input.keyboard.addKey("SPACE");

    spaceKey.on("down", () => {
      // Reset global inventory / hearts
      window.heart  = 3;
      window.bottle = 0;
      window.glove  = 0;
      window.needle = 0;

      // Start first level again
      this.scene.start("world");
    });
  }
}
