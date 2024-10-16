// Arrays and Object Notation Assignment
// Jacob Koshman
// October...
//
// Extra for Experts:
// 

let terrain = [];
let x = 10;
let text;
// let ballX = 25;
// let y;
// let radius = 25;
// let counter = 0;
const NUMBER_OF_BOXES = 1;

function preload() {
  text = loadFont("Inconsolata.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let howWide = width/NUMBER_OF_BOXES;
  generateTerrain(howWide);
}

function draw() {
  background(220);
  orbitControl();
  // moveBall();

  for(let someBox of terrain) {
    box(someBox.x, someBox.y, someBox.d);
  }
}

// function makeBall() {
//   circle(ballX, y, radius);
// }

// function moveBall() {
//   if (keyIsDown(68) && ballX<width-radius/2) {
//     ballX+=10;
//   }
//   if (keyIsDown(65) && ballX>radius/2) {
//     ballX-=10;
//   }
// }

function spawnBox(boxHeight, boxWidth, boxDepth) {
  let theBox = {
    x: boxWidth,
    y: boxHeight,
    d: boxDepth,
  };
  return theBox;
}

function generateTerrain(theWidth) {
  // for(let x = 0; x<width; x+=theWidth) {
  let someBox = spawnBox(x, theWidth, theWidth);
  terrain.push(someBox);
  //}
}