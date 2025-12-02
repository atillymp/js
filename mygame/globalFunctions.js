// ===== globalFunctions.js =====

// global variables
window.heart  = window.heart  ?? 3;
window.bottle = window.bottle ?? 0;
window.glove  = window.glove  ?? 0;
window.needle = window.needle ?? 0;

window.hasWon = false;   // prevent double-win

// REQUIRED AMOUNTS TO WIN
const TARGET_BOTTLE = 3;
const TARGET_GLOVE  = 3;
const TARGET_NEEDLE = 2;

function updateInventory() {
  console.log("*** updateInventory()");

  this.inventory = {
    heart:  window.heart,
    glove:  window.glove,
    needle: window.needle,
    bottle: window.bottle,
  };

  // send to HUD scene
  this.scene.get("showInventory").events.emit("inventory", this.inventory);
}

function checkWinCondition() {
  if (window.hasWon) return;  // already won previously

  const b = window.bottle;
  const g = window.glove;
  const n = window.needle;

  console.log("*** Check win:", b, g, n);

  if (b >= TARGET_BOTTLE && g >= TARGET_GLOVE && n >= TARGET_NEEDLE) {
    console.log("*** YOU WIN!");
    window.hasWon = true;
    this.scene.start("win");
  }
}

function globalCollectItem(player, item) {
  console.log("*** collected:", item.name);

  if (item.name.includes("bottle")) window.bottle++;
  if (item.name.includes("glove"))  window.glove++;
  if (item.name.includes("niddle")) window.needle++;

  item.disableBody(true, true);

  updateInventory.call(this);

  // ⭐ CHECK WIN HERE ⭐
  checkWinCondition.call(this);
}

function globalHitFire(player, item) {
  console.log("*** player overlap enemy/fire");

  if (this.justHit) {
    return;
  }
  this.justHit = true;

  this.cameras.main.shake(100);

  window.heart = Math.max(0, window.heart - 1);
  console.log("Hearts left:", window.heart);

  item.disableBody(true, true);

  updateInventory.call(this);

  if (window.heart <= 0) {
    console.log("*** GAME OVER");
    this.scene.start("gameOver");
  } else {
    this.time.delayedCall(1000, () => {
      this.justHit = false;
    });
  }
}
