class world3 extends Phaser.Scene {
  constructor() {
    super({ key: "world3" });
  }

  // incoming data from previous scene
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {
    // exported JSON map file
    this.load.tilemapTiledJSON("world3", "assets/world3.tmj");

    // tileset
    this.load.image("defimonImg", "assets/defimon1.png");

    // player sprite
    this.load.spritesheet("snugy", "assets/char.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // ===== items & enemy sprites (same as world/world2) =====
    this.load.spritesheet("enemy1", "assets/enemy1.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("col1", "assets/col1-anim.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("col2", "assets/col2-anim.png", {
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
    console.log("*** world3 scene");

    // ----- MAP -----
    let map = this.make.tilemap({ key: "world3" });
    let defimonTiles = map.addTilesetImage("defimon1", "defimonImg");
    let tilesArray = [defimonTiles];

    // layers (names must match Tiled)
    this.groundLayer   = map.createLayer("groundLayer",  tilesArray, 0, 0);
    this.roadLayer     = map.createLayer("roadLayer",    tilesArray, 0, 0);
    this.buildingLayer = map.createLayer("buildingLayer",tilesArray, 0, 0);
    this.grassLayer    = map.createLayer("grassLayer",   tilesArray, 0, 0);
    this.detailsLayer  = map.createLayer("detailsLayer", tilesArray, 0, 0);
    this.lightLayer    = map.createLayer("lightLayer",   tilesArray, 0, 0);

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

    // item animations
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

    // enemy animation
    if (!this.anims.exists("slowenemy1")) {
      this.anims.create({
        key: "slowenemy1",
        frames: this.anims.generateFrameNumbers("enemy1", { start: 0, end: 3 }),
        frameRate: 5,
        repeat: -1,
      });
    }

    // ----- DEBUG TEXT (optional) -----
    this.add.text(10, 10, "Add any text here", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

    // ----- PLAYER -----
    // spawn position in world3 – change if you want a different start point
    this.player = this.physics.add.sprite(300, 1100, "snugy");

    window.player = this.player; // debug

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // ----- HUD / INVENTORY BAR -----
    this.time.addEvent({
      delay: 100,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });
    this.scene.launch("showInventory");

    // ====== OBJECT LAYER: ITEMS & ENEMIES ======
    const objectLayerName = "ObjectLayer"; // must match Tiled layer name

    // bottle (col1)
    const bottle1Obj = map.findObject(objectLayerName, obj => obj.name === "bottle1");
    if (bottle1Obj) {
      this.bottle1 = this.physics.add
        .sprite(bottle1Obj.x, bottle1Obj.y, "col1")
        .play("slowcol1");
      this.bottle1.name = "bottle1";
    }

    // glove (col2)
    const glove1Obj = map.findObject(objectLayerName, obj => obj.name === "glove1");
    if (glove1Obj) {
      this.glove1 = this.physics.add
        .sprite(glove1Obj.x, glove1Obj.y, "col2")
        .play("slowcol2");
      this.glove1.name = "glove1";
    }

    // needle (col5) – note we use "niddle" in globalCollectItem check
    const needle1Obj = map.findObject(objectLayerName, obj => obj.name === "niddle1");
    if (needle1Obj) {
      this.niddle1 = this.physics.add
        .sprite(needle1Obj.x, needle1Obj.y, "col5")
        .play("slowcol5");
      this.niddle1.name = "niddle1";
    }

    // ENEMIES (15 of them) – any object whose name contains "enemy"
    this.enemies3 = this.physics.add.group();

    let enemyObjects = map.filterObjects(
      objectLayerName,
      obj => obj.name && obj.name.includes("enemy")
    );

    enemyObjects.forEach(enemyObj => {
      let enemySprite = this.physics.add
        .sprite(enemyObj.x, enemyObj.y, "enemy1")
        .play("slowenemy1");

      this.enemies3.add(enemySprite);
    });

    // ----- OVERLAPS -----

    // Collect items
    this.physics.add.overlap(
      this.player,
      [this.bottle1, this.glove1, this.niddle1].filter(Boolean),
      globalCollectItem,
      null,
      this
    );

    // Hit enemies (lose hearts)
    this.physics.add.overlap(
      this.player,
      this.enemies3,
      globalHitFire,
      null,
      this
    );
  } // end of create

  update() {
    let speed = 200;

    // reset velocity first
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

    // if you want a door back to world2, do a box check here similar to world2 → world3
  }

  // (optional) back to another room
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1", {
      player: player,
      inventory: this.inventory,
    });
  }
} // end of class world3
