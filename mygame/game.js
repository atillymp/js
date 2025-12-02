// game.js  – Phaser game configuration (no scenes here!)

var config = {
    type: Phaser.AUTO,

    // Your game screen size
    // (You were using 32 * 40 before – keep that unless you changed your tile size)
    width: 32 * 40,
    height: 32 * 40,

    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    backgroundColor: '#000000',
    pixelArt: true,

    // All scenes you actually use
    scene: [
        main,        // menu + instructions image
        world,
        world2,
        world3,
        showInventory,
        gameOver,
        win
    ]
};

let game = new Phaser.Game(config);

// ===== Global variables =====
window.heart  = 3; // lives
window.col1   = 0; // bottle
window.col2   = 0; // glove
window.col5   = 0; // needle

