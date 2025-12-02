class instructions extends Phaser.Scene {
    constructor() {
        super("instructions");
    }

    preload() {
        // Load your instruction image
        this.load.image("instructionsScreen", "assets/instructions.png");
    }

    create() {
        console.log("*** instructions screen");

        let centerX = this.cameras.main.width / 2;
        let centerY = this.cameras.main.height / 2;

        // Show instructions image
        this.add.image(centerX, centerY, "instructionsScreen").setOrigin(0.5);

        // SPACE to go to game
        let spaceKey = this.input.keyboard.addKey("SPACE");
        spaceKey.on("down", () => {
            this.scene.start("world");
        });
    }
}
