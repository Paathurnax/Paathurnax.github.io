//Generative Art Demo
//October 4th

const TILE_SIZE = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  let arr = [];
  for (let x = 0; x<width; x+=TILE_SIZE) {
    for (let y = 0; y<height; y+=TILE_SIZE) {
      let someTile = spawnTile(x, y);
      arr.push(someTile);
    }
  }

  for (let myTile of arr) {
    stroke(myTile.r, myTile.g, myTile.b)
    rect(myTile.x1, myTile.y1, myTile.x2, myTile.y2);
  }
}

function spawnTile(x, y) {
  let tile;
  let choice = random(100);

  if (choice<50) {
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y - TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y + TILE_SIZE/2,
      r: random(50, 200),
      g: random(50, 200),
      b: random(50, 200),
    };
  }
  else {
    tile = {
      x1: x - TILE_SIZE/2,
      y1: y + TILE_SIZE/2,
      x2: x + TILE_SIZE/2,
      y2: y - TILE_SIZE/2,
    };
  }

  return tile;
}