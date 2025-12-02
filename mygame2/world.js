class world extends Phaser.Scene {
  constructor() {
    super({ key: "world" });
  }

  // incoming data from scene below
  init(data) {
    this.player    = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    // map
    this.load.tilemapTiledJSON("world", "assets/world.tmj");

    // tileset
    this.load.image("defimonImg", "assets/defimon1.png");

    // player
    this.load.spritesheet("snugy", "assets/char.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // collectables
    this.load.spritesheet("col1", "assets/col1-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("col2", "assets/col2-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("col3", "assets/col3-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // enemy
    this.load.spritesheet("enemy1", "assets/enemy1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    console.log("*** world scene");

    // ----- MAP -----
    let map = this.make.tilemap({ key: "world" });
    let defimonTiles = map.addTilesetImage("defimon1", "defimonImg");
    let tilesArray = [defimonTiles];

    this.groundLayer   = map.createLayer("groundLayer",  tilesArray, 0, 0);
    this.roadLayer     = map.createLayer("roadLayer",    tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer",tilesArray, 0, 0);
    this.threeLayer    = map.createLayer("threeLayer",   tilesArray, 0, 0);
    this.detailsLayer  = map.createLayer("detailsLayer", tilesArray, 0, 0);

    // ----- PLAYER ANIMATIONS -----
    this.anims.create({
      key: "snugy-up",
      frames: this.anims.generateFrameNumbers("snugy", { start: 105, end: 112 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "snugy-left",
      frames: this.anims.generateFrameNumbers("snugy", { start: 118, end: 125 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "snugy-down",
      frames: this.anims.generateFrameNumbers("snugy", { start: 131, end: 138 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "snugy-right",
      frames: this.anims.generateFrameNumbers("snugy", { start: 144, end: 151 }),
      frameRate: 5,
      repeat: -1,
    });

    // ----- HUD DEBUG TEXT (optional) -----
    this.add.text(10, 10, "Add any text here", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

    // ----- PLAYER -----
    this.player = this.physics.add.sprite(300, 1100, "snugy");
    window.player = this.player; // debug in console

    // ----- COLLECTABLE ANIMATIONS -----
    this.anims.create({
      key: "slowcol1",
      frames: this.anims.generateFrameNumbers("col1", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowcol2",
      frames: this.anims.generateFrameNumbers("col2", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowcol3",
      frames: this.anims.generateFrameNumbers("col3", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    // ----- ENEMY ANIMATION -----
    this.anims.create({
      key: "slowenemy1",
      frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    // ----- COLLECTABLE OBJECTS -----
    let bottle1Obj = map.findObject("ObjectLayer", (obj) => obj.name === "bottle1");
    this.bottle1 = this.physics.add
      .sprite(bottle1Obj.x, bottle1Obj.y, "col1")
      .play("slowcol1");
    this.bottle1.name = "bottle1";

    let bottle2Obj = map.findObject("ObjectLayer", (obj) => obj.name === "bottle2");
    this.bottle2 = this.physics.add
      .sprite(bottle2Obj.x, bottle2Obj.y, "col1")
      .play("slowcol1");
    this.bottle2.name = "bottle2";

    let bottle3Obj = map.findObject("ObjectLayer", (obj) => obj.name === "bottle3");
    this.bottle3 = this.physics.add
      .sprite(bottle3Obj.x, bottle3Obj.y, "col1")
      .play("slowcol1");
    this.bottle3.name = "bottle3";

    let glove1Obj = map.findObject("ObjectLayer", (obj) => obj.name === "glove1");
    this.glove1 = this.physics.add
      .sprite(glove1Obj.x, glove1Obj.y, "col2")
      .play("slowcol2");
    this.glove1.name = "glove1";

    let glove2Obj = map.findObject("ObjectLayer", (obj) => obj.name === "glove2");
    this.glove2 = this.physics.add
      .sprite(glove2Obj.x, glove2Obj.y, "col3")
      .play("slowcol3");
    this.glove2.name = "glove2";

    // ----- ENEMIES GROUP -----
    this.enemies = this.physics.add.group();

    let enemyObjects = map.filterObjects("ObjectLayer", (obj) =>
      obj.name && obj.name.includes("enemy")
    );

    enemyObjects.forEach((enemyObj) => {
      let enemySprite = this.physics.add
        .sprite(enemyObj.x, enemyObj.y, "enemy1")
        .play("slowenemy1");

      this.enemies.add(enemySprite);
    });

    // ----- INPUT & CAMERA -----
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player);

    // ----- HUD BAR -----
    this.scene.launch("showInventory");

    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // ----- OVERLAPS -----

    // enemy → player loses heart
    this.physics.add.overlap(this.player, this.enemies, globalHitFire, null, this);

    // collect items → counts + win check done in globalCollectItem()
    this.physics.add.overlap(
      this.player,
      [this.glove1, this.glove2, this.bottle1, this.bottle2, this.bottle3],
      globalCollectItem,
      null,
      this
    );
  } // end create

  update() {
    let speed = 200;

    // movement
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play("snugy-left", true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play("snugy-right", true);
    } else if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play("snugy-up", true);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play("snugy-down", true);
    } else {
      this.player.anims.stop();
    }

    ///////----Enter & Exit Room/Levels ----////
    if (
      this.player.x > 2449 && // door X min
      this.player.x < 2550 && // door X max
      this.player.y > 630 &&  // door Y min
      this.player.y < 830     // door Y max
    ) {
      console.log("Go to next map!");
      this.world2();
    }
  }

  // Function to jump to world2
  world2() {
    console.log("world2 function");
    this.scene.start("world2", {
      player: this.player,
      inventory: this.inventory,
    });
  }
} // end of class world
