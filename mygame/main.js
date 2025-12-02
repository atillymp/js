class main extends Phaser.Scene {
    constructor() {
        super("main");
    }

    preload() {
        // Load both images
        this.load.image("menuScreen", "assets/menu.png");          // first screen
        this.load.image("instructionsScreen", "assets/instructions.png"); // second screen
    }

    create() {
        console.log("*** main scene");

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Start at MENU state
        this.currentStage = "menu";

        // One image object that we reuse
        this.screenImage = this.add
            .image(centerX, centerY, "menuScreen")
            .setOrigin(0.5);

        // Press SPACE to progress
        const spaceKey = this.input.keyboard.addKey("SPACE");

        spaceKey.on("down", () => {
            if (this.currentStage === "menu") {
                // Go to instructions screen
                this.currentStage = "instructions";
                this.screenImage.setTexture("instructionsScreen");
            } else if (this.currentStage === "instructions") {
                // Start the actual game
                this.scene.start("world");
            }
        });
    }
}
