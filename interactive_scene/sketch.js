// Interactive Scene
// Jacob Koshman
// September ...
//
// Extra for Experts:
// - i used orbitcontrol to manipulate the perspective in a 3d plane using the mouse


let state = "start";
let font;
let size = 2000;
let dx = 5;
let dy = 6;
let dz = 7;
let size2 = 20;
let x, y, z;

function preload() {
  font = loadFont('Inconsolata.otf')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  x = 0;
  y = 0;
  z = 0;
}


function screenSwitch() {
  if (state === "start") {
    background(0)
    fill(255)
    textFont(font)
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
if (state === "thing") {
  box(size)
}
}

function bounce() {
  if (x>= size - size2/2 || x<=size2/2) {
    dx = dx * -1
  }
  if (y>= size - size2/2 || y<=size2/2) {
    dy = dy * -1
  }
  if (z>= size - size2/2 || z<=size2/2) {
    dz = dz * -1
  }
}

function moveBall() {
  x+=dx
  y+=dy
  z+=dz
}

function draw(){
  screenSwitch();
  makeBox();
}
