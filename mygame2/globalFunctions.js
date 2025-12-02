// ===== globalFunctions.js =====

// global variables
window.heart  = window.heart  ?? 3;
window.bottle = window.bottle ?? 0;
window.glove  = window.glove  ?? 0;
window.needle = window.needle ?? 0;

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

function globalCollectItem(player, item) {
  console.log("*** collected:", item.name);

  if (item.name.includes("bottle")) window.bottle++;
  if (item.name.includes("glove"))  window.glove++;
  if (item.name.includes("niddle")) window.needle++;

  item.disableBody(true, true);

  updateInventory.call(this);
}

function globalHitFire(player, item) {
  console.log("*** player hit enemy");

  this.cameras.main.shake(100);
  window.heart--;
  updateInventory.call(this);

  if (window.heart <= 0) {
    console.log("*** game over");
    this.scene.start("gameOver");
  }
}
