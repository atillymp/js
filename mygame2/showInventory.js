// ===== showInventory.js =====
class showInventory extends Phaser.Scene {
  constructor() {
    super({ key: "showInventory" });
  }

  create() {
    console.log("*** showInventory");

    // HUD camera fixed to screen
    this.cameras.main.setScroll(0, 0);
    this.cameras.main.setOrigin(0, 0);

    const barHeight = 50;

    // White bar across top
    this.add
      .rectangle(0, 0, this.scale.width, barHeight, 0xffffff)
      .setOrigin(0, 0)
      .setDepth(0);

    // ---------- HEARTS (LIVES) ----------
    this.heartSprites = [];
    const heartY = 25;
    const heartStartX = 30;
    const heartSpacing = 30;

    for (let i = 0; i < 3; i++) {
      const h = this.add
        .image(heartStartX + i * heartSpacing, heartY, "heart")
        .setScale(0.45)
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(1);
      this.heartSprites.push(h);
    }

    // ---------- ITEM COUNTERS ----------
    const iconScale = 0.5;
    const textStyle = { font: "16px Arial", fill: "#000" };

    // Bottle (col1)
    this.bottleIcon = this.add
      .image(170, heartY, "col1", 0)
      .setScale(iconScale)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1);
    this.bottleText = this.add
      .text(190, heartY - 10, "x0", textStyle)
      .setScrollFactor(0)
      .setDepth(1);

    // Glove (col2)
    this.gloveIcon = this.add
      .image(240, heartY, "col2", 0)
      .setScale(iconScale)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1);
    this.gloveText = this.add
      .text(260, heartY - 10, "x0", textStyle)
      .setScrollFactor(0)
      .setDepth(1);

    // Needle (col5)
    this.needleIcon = this.add
      .image(310, heartY, "col5", 0)
      .setScale(iconScale)
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1);
    this.needleText = this.add
      .text(330, heartY - 10, "x0", textStyle)
      .setScrollFactor(0)
      .setDepth(1);

    // 🔴 IMPORTANT: listen for "inventory" event from updateInventory()
    this.events.on("inventory", (inv) => {
      this.refreshInventoryUI(inv);
    });

    // Draw once at start using globals (in case they already have values)
    const startInv = {
      heart: window.heart ?? 3,
      bottle: window.bottle ?? 0,
      glove: window.glove ?? 0,
      needle: window.needle ?? 0,
    };
    this.refreshInventoryUI(startInv);
  }

  // Called from updateInventory() via event
  refreshInventoryUI(inv) {
    console.log("*** HUD refreshInventoryUI()", inv);

    // Hearts visibility
    this.heartSprites.forEach((h, index) => {
      h.setVisible(index < inv.heart);
    });

    // Counters
    this.bottleText.setText("x" + inv.bottle);
    this.gloveText.setText("x" + inv.glove);
    this.needleText.setText("x" + inv.needle);
  }
}
