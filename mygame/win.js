class win extends Phaser.Scene {
    constructor() {
        super("win");
    }

    preload() {
        // optional: win image
        // this.load.image("winScreen", "assets/win.png");
    }

    create() {
        console.log("*** WIN SCREEN");

        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        // simple win text
        this.add.text(centerX, centerY, "YOU WIN!", {
            font: "48px Arial",
            fill: "#ffffff"
        }).setOrigin(0.5);

        // restart with SPACE
        let spaceKey = this.input.keyboard.addKey("SPACE");
        spaceKey.on("down", () => {
            this.scene.start("main");
        });
    }
}

