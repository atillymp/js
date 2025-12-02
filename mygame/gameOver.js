class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

preload() {
  this.load.image("gameOverImg", "assets/gameOver.png");

}

create() {
    console.log("*** gameover scene");

    this.scene.bringToTop("gameOver");

    // Get center
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    // Background Game Over image
    this.add.image(centerX, centerY, 'gameOverImg')
        .setOrigin(0.5)
        .setScale(1);

    // YES / NO text positions
    this.yesText = this.add.text(centerX - 50, centerY + 120, "YES", {
        font: "40px pixel",
        fill: "#ffffff"
    }).setOrigin(0.5);

    this.noText = this.add.text(centerX + 80, centerY + 120, "NO", {
        font: "40px pixel",
        fill: "#ffffff"
    }).setOrigin(0.5);

    // Selector arrow (▶)
    this.selector = this.add.text(this.yesText.x - 40, this.yesText.y, "▶", {
        font: "40px pixel",
        fill: "#ffffff"
    }).setOrigin(0.5);

    // Track selected option
    this.selected = "YES";

    // Controls
    this.input.keyboard.on("keydown-LEFT", () => {
        this.selected = "YES";
        this.selector.setPosition(this.yesText.x - 40, this.yesText.y);
    });

    this.input.keyboard.on("keydown-RIGHT", () => {
        this.selected = "NO";
        this.selector.setPosition(this.noText.x - 40, this.noText.y);
    });

    this.input.keyboard.on("keydown-ENTER", () => {
        if (this.selected === "YES") {
            // Reset everything and restart
            window.heart = 3;
            window.bottle = 0;
            window.glove = 0;
            window.needle = 0;

            this.scene.start("world");
        } else {
            // NO → optional: go to main scene or reload
            this.scene.start("main");
        }
    });
}


}