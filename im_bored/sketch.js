// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  multipleSquare(width/50)
}

function makeSquare(x, y, width, height) {
  rect(x, y, width, height)
}

function multipleSquare(i) {
  for (let j = 0; j<i; j++) {
    makeSquare(j*50, height/2 - 25, 50, 50)
  }
}
