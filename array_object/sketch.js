// Arrays and Object Notation Assignment
// Jacob Koshman
// October...
//
// Extra for Experts:
// 

let terrain = [];
let x = 10;
// let ballX = 25;
// let y;
// let radius = 25;
// let counter = 0;
const NUMBER_OF_BOXES = 1;

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
    box(someBox.y, someBox.x, someBox.d);
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

function spawnBox(left, boxHeight, boxWidth) {
  let theBox = {
    x: left,
    y: boxHeight,
    d: boxWidth,
  };
  return theBox;
}

function generateTerrain(theWidth) {
  // for(let x = 0; x<width; x+=theWidth) {
  let someBox = spawnBox(x, theWidth, theWidth);
  terrain.push(someBox);
  //}
}