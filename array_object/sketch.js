// Arrays and Object Notation Assignment
// Jacob Koshman
// October...
//
// Extra for Experts:
// 

let terrain = [];
let x = 25;
let y = 25;
let radius = 25;
const NUMBER_OF_RECTS = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width/NUMBER_OF_RECTS;
  generateTerrain(howWide);
}

function draw() {
  background(220);
  makeBall();

  for(let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);

  }
}

function makeBall() {
  circle(x, y, radius);
}

function moveBall() {
  if (keyIsDown(68) && x<width-radius) {
    x+=10;
  }
  if (keyIsDown(65) && x>radius) {
    x-=10;
  }
}

function spawnRect(left, rectHeight, rectWidth) {
  let theRect = {
    x: left,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
    y2: height - rectHeight,
  };
  return theRect;
}

function generateTerrain(theWidth) {
  let time = 0;
  let deltaTime = 0.005;
  for(let x =0; x<width; x+=theWidth) {
    let theHeight = noise(time) * height;
    let someRect = spawnRect(x, theHeight, theWidth);
    terrain.push(someRect);
    time+=deltaTime;
  }
}