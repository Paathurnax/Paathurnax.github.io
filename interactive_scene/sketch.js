// Interactive Scene
// Jacob Koshman
// October 1st
//
// Extra for Experts:
// - i used orbitcontrol to manipulate the perspective in a 3d plane using the mouse


let state = "start";
let font;
let pos;
let vel;
let radius;
let shapeSize;
let iRanOutOfGoodNames;
let r = 50;
let g = 50;
let b = 50;


//preloading the font
function preload() {
 font = loadFont('Inconsolata.otf')
}


//setting up the canvas and initializing the vectors
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pos = createVector(0, 0, 0);
  vel = createVector(3, 4, 5);
  shapeSize = 2000;
  radius = shapeSize/10
  iRanOutOfGoodNames = shapeSize/2 - radius;

}

//change what is displayed based on a state variable
function screenSwitch() {
  if (state === "start") {
    background(0)
    fill(255)
    textFont(font)
    textAlign(CENTER, CENTER)
    text("press space", -width/4, -width/8)
    text("to start", -width/4, -width/20)
    textSize(30)
    if (keyIsDown(32)) {
      state = "thing"
    }
}
}

//creates a box
function makeBox() {
  noFill();
  stroke(100);
  strokeWeight(5)
  box(shapeSize) 
}

//makes ball go boing
function bounce() {
  if (pos.x > iRanOutOfGoodNames || pos.x < -iRanOutOfGoodNames) {
    vel.x *= -1;
  }
  if (pos.y > iRanOutOfGoodNames || pos.y < -iRanOutOfGoodNames) {
    vel.y *= -1;
  }
  if (pos.z > iRanOutOfGoodNames || pos.z < -iRanOutOfGoodNames) {
    vel.z *= -1;
  }
}

// moves the ball
function moveBall() {
  pos.add(vel);
}

//creates the sphere 
function displayBall() {
  push();
  fill(r, g, b);
  noStroke();
  translate(pos.x, pos.y, pos.z);
  sphere(radius)
  pop();
}

//changing the color of the sphere to a random value based on a key press
function keyPressed() {
  if (key === "w") {
    r = random(50, 200)
    g = random(50, 200)
    b = random(50, 200)
    console.log(r, g, b)
  }
}


//running the functions
function draw() {
  screenSwitch();
if (state === "thing") {
  background(0)
  orbitControl();
  bounce();
  moveBall();
  makeBox();
  displayBall();
}
}
