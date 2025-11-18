class world3 extends Phaser.Scene {
  constructor() {
    super({
      key: "world3",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }

  preload() {

    //this is the exported JSON map file
    this.load.tilemapTiledJSON("city3", "assets/city3.tmj");

    
    this.load.image("defimonImg", "assets/defimon1.png");

     this.load.spritesheet("snugy", "assets/char.png",{ frameWidth:64, frameHeight:64 }); 



  }

  create() {
    console.log("*** world scene");

    // Create the map from main
    let map = this.make.tilemap({
      key: "city3",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let defimonTiles = map.addTilesetImage("defimon1", "defimonImg");

    let tilesArray = [defimonTiles];

    //Load in layers by layers

    this.groundLayer = map.createLayer ("groundLayer", tilesArray, 0,0)
    this.roadLayer = map.createLayer ("roadLayer", tilesArray, 0,0)
    this.buildingLayer = map.createLayer ("buildingLayer", tilesArray, 0,0)
    this.grassLayer = map.createLayer ("grassLayer", tilesArray, 0,0)
    this.detailsLayer = map.createLayer ("detailsLayer", tilesArray, 0,0)
    this.lightLayer = map.createLayer ("lightLayer", tilesArray, 0,0)

    ////charecter animations
     this.anims.create({
        key:'snugy-up',
        frames:this.anims.generateFrameNumbers('snugy',
        { start:105, end:112 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'snugy-left',
        frames:this.anims.generateFrameNumbers('snugy',
        { start:118, end:125 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'snugy-down',
        frames:this.anims.generateFrameNumbers('snugy',
        { start:131, end:138 }),
        frameRate:5,
        repeat:-1
    });

    this.anims.create({
        key:'snugy-right',
        frames:this.anims.generateFrameNumbers('snugy',
        { start:144, end:151 }),
        frameRate:5,
        repeat:-1
    });

   

    // Add any text to the game
    this.add.text(10, 10, "Add any text here", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

    // Add main player here with physics.add.sprite
    this.player = this.physics.add.sprite(300, 1100, 'snugy');

// debug player
window.player = this.player

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);
  } /////////////////// end of create //////////////////////////////

  update() {
      let speed = 200;
      console.log(this.player.x, this.player.y)

if (this.cursors.left.isDown) {
	this.player.body.setVelocityX(-speed);
	this.player.anims.play("snugy-left", true); // walk left
} else if (this.cursors.right.isDown) {
	this.player.body.setVelocityX(speed);
	this.player.anims.play("snugy-right", true);
} else if (this.cursors.up.isDown) {
	this.player.body.setVelocityY(-speed);
	this.player.anims.play("snugy-up", true);
} else if (this.cursors.down.isDown) {
	this.player.body.setVelocityY(speed);
	this.player.anims.play("snudy-down", true);
} else {
	this.player.anims.stop();
	this.player.body.setVelocity(0, 0);
}
  }
   /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1", {
      player: player,
      inventory: this.inventory,
    });
  }
} //////////// end of class world ////////////////////////