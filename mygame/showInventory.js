// ===== showInventory.js =====
class showInventory extends Phaser.Scene {
  constructor() {
    super({ key: "showInventory" });
  }

  preload() {
    // HUD images (use your existing assets)
    this.load.image("heart", "assets/heart.png");
    this.load.image("col1Icon", "assets/col1.png"); // bottle
    this.load.image("col2Icon", "assets/col2.png"); // glove
    this.load.image("col5Icon", "assets/col5.png"); // needle
  }

  create() {
    console.log("*** showInventory");

    // Fix HUD to screen
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setOrigin(0, 0);

    const width = this.sys.game.config.width;
    const barHeight = 40;

    // White bar at top
    const rect = new Phaser.Geom.Rectangle(0, 0, width, barHeight);
    const graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
    graphics.fillRectShape(rect).setScrollFactor(0);

    const centerY = barHeight / 2;

    // ---------- HEARTS (lives) ----------
    this.heartSprites = [];

    const heartScale   = 0.12;  // smaller hearts
    const heartStartX  = 40;    // first heart position (x)
    const heartSpacing = 45;    // space between hearts

    for (let i = 0; i < 3; i++) {
      const h = this.add
        .image(heartStartX + i * heartSpacing, centerY, "heart")
        .setScale(heartScale)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1);

      this.heartSprites.push(h);
    }

    // ---------- COL1 (bottle) ----------
    this.bottleIcon = this.add
      .image(200, centerY, "col1Icon")
      .setScrollFactor(0)
      .setScale(0.7);
    this.bottleText = this.add
      .text(220, centerY - 10, "x0", {
        font: "18px Arial",
        fill: "#000000",
      })
      .setScrollFactor(0);

    // ---------- COL2 (glove) ----------
    this.gloveIcon = this.add
      .image(280, centerY, "col2Icon")
      .setScrollFactor(0)
      .setScale(0.7);
    this.gloveText = this.add
      .text(300, centerY - 10, "x0", {
        font: "18px Arial",
        fill: "#000000",
      })
      .setScrollFactor(0);

    // ---------- COL5 (needle) ----------
    this.needleIcon = this.add
      .image(360, centerY, "col5Icon")
      .setScrollFactor(0)
      .setScale(0.7);
    this.needleText = this.add
      .text(380, centerY - 10, "x0", {
        font: "18px Arial",
        fill: "#000000",
      })
      .setScrollFactor(0);

    // Listen for updates from globalFunctions.updateInventory()
    this.events.on("inventory", this.updateScreen, this);

    // Draw once at start using current global values
    this.updateScreen({
      heart: window.heart ?? 3,
      bottle: window.bottle ?? 0,
      glove: window.glove ?? 0,
      needle: window.needle ?? 0,
    });
  }

  // Called whenever updateInventory emits an event
  updateScreen(data) {
    console.log("HUD update", data);

    // Safety guard – if hearts not ready, just skip (prevents your error)
    if (!this.heartSprites || this.heartSprites.length === 0) {
      return;
    }

    // ----- Hearts -----
    this.heartSprites.forEach((h, index) => {
      if (h) {
        h.setVisible(index < data.heart);
      }
    });

    // ----- Counters -----
    this.bottleText.setText("x" + (data.bottle ?? 0));
    this.gloveText.setText("x" + (data.glove ?? 0));
    this.needleText.setText("x" + (data.needle ?? 0));
  }
}
