class world2 extends Phaser.Scene {
  constructor() {
    super({ key: "world2" });
  }

  // incoming data from previous scene
  init(data) {
    this.player    = data.player;
    this.inventory = data.inventory;
  }

  preload() {

    // map
    this.load.tilemapTiledJSON("world2", "assets/world2.tmj");

    // tileset
    this.load.image("defimonImg", "assets/defimon1.png");

    // enemy
    this.load.spritesheet("enemy1", "assets/enemy1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // player
    this.load.spritesheet("snugy", "assets/char.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // collectibles
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
    this.load.spritesheet("col4", "assets/col3-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("col5", "assets/col5-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("col6", "assets/col6-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    console.log("*** world2 scene");

    // ----- MAP & LAYERS -----
    let map = this.make.tilemap({ key: "world2" });
    let defimonTiles = map.addTilesetImage("defimon1", "defimonImg");
    let tilesArray = [defimonTiles];

    this.groundLayer   = map.createLayer("GroundLayer",   tilesArray, 0, 0);
    this.roadLayer     = map.createLayer("roadLayer",     tilesArray, 0, 0);
    this.grassLayer    = map.createLayer("grassLayer",    tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer", tilesArray, 0, 0);
    this.grass2Layer   = map.createLayer("grass2Layer",   tilesArray, 0, 0);
    this.detailsLayer  = map.createLayer("detailsLayer",  tilesArray, 0, 0);
    this.carLayer      = map.createLayer("carLayer",      tilesArray, 0, 0);

    // ----- PLAYER ANIMATIONS -----
    if (!this.anims.exists("snugy-up")) {
      this.anims.create({
        key: "snugy-up",
        frames: this.anims.generateFrameNumbers("snugy", { start: 105, end: 112 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("snugy-left")) {
      this.anims.create({
        key: "snugy-left",
        frames: this.anims.generateFrameNumbers("snugy", { start: 118, end: 125 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("snugy-down")) {
      this.anims.create({
        key: "snugy-down",
        frames: this.anims.generateFrameNumbers("snugy", { start: 131, end: 138 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("snugy-right")) {
      this.anims.create({
        key: "snugy-right",
        frames: this.anims.generateFrameNumbers("snugy", { start: 144, end: 151 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    // HUD debug text (optional)
    this.add.text(10, 10, "Add any text here", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

    // ----- PLAYER -----
    this.player = this.physics.add.sprite(73, 1293, "snugy");
    window.player = this.player; // debug

    // ----- COLLECTIBLE ANIMATIONS -----
    if (!this.anims.exists("slowcol1")) {
      this.anims.create({
        key: "slowcol1",
        frames: this.anims.generateFrameNumbers("col1", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("slowcol2")) {
      this.anims.create({
        key: "slowcol2",
        frames: this.anims.generateFrameNumbers("col2", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("slowcol3")) {
      this.anims.create({
        key: "slowcol3",
        frames: this.anims.generateFrameNumbers("col3", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("slowcol4")) {
      this.anims.create({
        key: "slowcol4",
        frames: this.anims.generateFrameNumbers("col4", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("slowcol5")) {
      this.anims.create({
        key: "slowcol5",
        frames: this.anims.generateFrameNumbers("col5", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.anims.exists("slowcol6")) {
      this.anims.create({
        key: "slowcol6",
        frames: this.anims.generateFrameNumbers("col6", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    // ----- ENEMY ANIMATION -----
    if (!this.anims.exists("slowenemy1")) {
      this.anims.create({
        key: "slowenemy1",
        frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    // ----- COLLECTIBLES FROM OBJECT LAYER -----
    const objectLayerName = "ObjectLayer";

    const bottle1 = map.findObject(objectLayerName, (obj) => obj.name === "bottle1");
    if (bottle1) {
      this.bottle1 = this.physics.add.sprite(bottle1.x, bottle1.y, "col1").play("slowcol1");
      this.bottle1.name = "bottle1";
    }

    const bottle2 = map.findObject(objectLayerName, (obj) => obj.name === "bottle2");
    if (bottle2) {
      this.bottle2 = this.physics.add.sprite(bottle2.x, bottle2.y, "col1").play("slowcol1");
      this.bottle2.name = "bottle2";
    }

    const bottle3 = map.findObject(objectLayerName, (obj) => obj.name === "bottle3");
    if (bottle3) {
      this.bottle3 = this.physics.add.sprite(bottle3.x, bottle3.y, "col1").play("slowcol1");
      this.bottle3.name = "bottle3";
    }

    const bottle4 = map.findObject(objectLayerName, (obj) => obj.name === "bottle4");
    if (bottle4) {
      this.bottle4 = this.physics.add.sprite(bottle4.x, bottle4.y, "col1").play("slowcol1");
      this.bottle4.name = "bottle4";
    }

    const glove1 = map.findObject(objectLayerName, (obj) => obj.name === "glove1");
    if (glove1) {
      this.glove1 = this.physics.add.sprite(glove1.x, glove1.y, "col2").play("slowcol2");
      this.glove1.name = "glove1";
    }

    const glove2 = map.findObject(objectLayerName, (obj) => obj.name === "glove2");
    if (glove2) {
      this.glove2 = this.physics.add.sprite(glove2.x, glove2.y, "col2").play("slowcol2");
      this.glove2.name = "glove2";
    }

    const glove3 = map.findObject(objectLayerName, (obj) => obj.name === "glove3");
    if (glove3) {
      this.glove3 = this.physics.add.sprite(glove3.x, glove3.y, "col2").play("slowcol2");
      this.glove3.name = "glove3";
    }

    const gun1 = map.findObject(objectLayerName, (obj) => obj.name === "gun1");
    if (gun1) {
      this.gun1 = this.physics.add.sprite(gun1.x, gun1.y, "col6").play("slowcol6");
      this.gun1.name = "gun1";
    }

    const gun2 = map.findObject(objectLayerName, (obj) => obj.name === "gun2");
    if (gun2) {
      this.gun2 = this.physics.add.sprite(gun2.x, gun2.y, "col6").play("slowcol6");
      this.gun2.name = "gun2";
    }

    const niddle1 = map.findObject(objectLayerName, (obj) => obj.name === "niddle1");
    if (niddle1) {
      this.niddle1 = this.physics.add.sprite(niddle1.x, niddle1.y, "col5").play("slowcol5");
      this.niddle1.name = "niddle1";
    }

    // ----- ENEMIES FROM OBJECT LAYER -----
    this.enemies2 = this.physics.add.group();

    let enemyObjects = map.filterObjects(objectLayerName, (obj) =>
      obj.name && obj.name.includes("enemy")
    );

    enemyObjects.forEach((enemyObj) => {
      let enemySprite = this.physics.add
        .sprite(enemyObj.x, enemyObj.y, "enemy1")
        .play("slowenemy1");

      this.enemies2.add(enemySprite);
    });

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow
    this.cameras.main.startFollow(this.player);

    // ----- HUD / INVENTORY -----
    this.scene.launch("showInventory");

    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // ----- OVERLAPS -----

    // collectables → use globalCollectItem so counters work like world3
    this.physics.add.overlap(
      this.player,
      [
        this.bottle1,
        this.bottle2,
        this.bottle3,
        this.bottle4,
        this.glove1,
        this.glove2,
        this.glove3,
        this.gun1,
        this.gun2,
        this.niddle1,
      ].filter(Boolean),
      globalCollectItem,
      null,
      this
    );

    // enemies → hearts
    this.physics.add.overlap(
      this.player,
      this.enemies2,
      globalHitFire,
      null,
      this
    );
  } // -------------------- end of create --------------------

  update() {
    console.log(this.player.x, this.player.y);
    let speed = 200;

    // reset velocity each frame
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

    // ===== DOOR TO WORLD 3 =====
    if (
      this.player.x > 2450 &&   // X min
      this.player.x < 2500 &&   // X max
      this.player.y > 1270 &&   // Y min
      this.player.y < 1580      // Y max
    ) {
      console.log("Go to world3!");
      this.scene.start("world3", {
        player: this.player,
        inventory: this.inventory,
      });
    }
  }

  // (optional helper if you want to call it)
  world3() {
    console.log("world3 function");
    this.scene.start("world3", {
      player: this.player,
      inventory: this.inventory,
    });
  }
} // end of class world2
