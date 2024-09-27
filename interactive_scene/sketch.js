// Interactive Scene
// Jacob Koshman
// September ...
//
// Extra for Experts:
// - i used orbitcontrol to manipulate the perspective in a 3d plane using the mouse


let state = "start";
let font;
let size = 500;
let dx = 3;
let dy = 2;
let dz = 1;
let size2 = 50;
let x = 0;
let y = 0;
let z = 0;

function preload() {
  font = loadFont('Inconsolata.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}


function screenSwitch() {
  if (state === "start") {
    background(255, 0, 255)
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

// function sphereThing() {
//   if (state === "thing") {
//     orbitControl();
//     background(255)
//     for(let z = 0; z < 180; z+=15) {
//       for(let x = 0; x < 360; x+=15) {
//         push();
//         rotateZ(z)
//         rotateX(x)
//         translate(0, height, 0)
//         push();
//         fill("green")
//         sphere(size);
//         pop();
//         fill(0)
//         box(size+75);
//         pop();
//       }
//     }
// }
// }
function makeBox() {
  background(255)
  orbitControl();
  noFill();
  box(size)
  rotateX(20)
}


function bounce() {
  if (x>= size - size2/2 || x<=size2/2) {
    dx = dx * -1
    console.log("xbounce")
  }
  if (y>= size - size2/2 || y<=size2/2) {
    dy = dy * -1
    console.log("ybounce")
  }
  if (z>= size - size2/2 || z<=size2/2) {
    dz = dz * -1
    console.log("zbounce")
  }
}

function moveBall() {
  x+=dx
  y+=dy
  z+=dz
}

function displayBall() {
  push();
  fill(0)
  translate(0, height, 0)
  sphere(size2)
  pop();
}

function draw(){
  screenSwitch();
if (state === "thing") {
  displayBall();
  makeBox();
  bounce();
  moveBall();
}
}
