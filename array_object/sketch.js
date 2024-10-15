// Arrays and Object Notation Assignment
// Jacob Koshman
// October...
//
// Extra for Experts:
// 

let terrain = [];
let ballX = 25;
let y;
let radius = 25;
let counter = 0;
const NUMBER_OF_RECTS = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let howWide = width/NUMBER_OF_RECTS;
  generateTerrain(howWide);
}

function draw() {
  background(220);
  moveBall();

  for(let someRect of terrain) {
    rect(someRect.x, someRect.y, someRect.w, someRect.h);
  }
  if (counter === 0) {
    circle(ballX, y - radius/2, radius);
  }
  counter++;
}

// function makeBall() {
  
// }

function moveBall() {
  if (keyIsDown(68) && ballX<width-radius/2) {
    ballX+=10;
  }
  if (keyIsDown(65) && ballX>radius/2) {
    ballX-=10;
  }
}

function spawnRect(left, rectHeight, rectWidth) {
  let theRect = {
    x: left,
    y: height - rectHeight,
    w: rectWidth,
    h: rectHeight,
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
    y = terrain.y;
    time+=deltaTime;
  }
}