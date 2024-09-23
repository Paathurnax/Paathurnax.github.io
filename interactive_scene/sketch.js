// Interactive Scene
// Jacob Koshman
// September ...
//
// Extra for Experts:
// - i used orbitcontrol to manipulate the perspective in a 3d plane using the mouse


let state = "start";
let font;
let size = 100;

function preload() {
  font = loadFont('Inconsolata.otf')

}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
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

function sphereThing() {
  if (state === "thing") {
    orbitControl();
    background(255)
    for(let z = 0; z < 180; z+=15) {
      for(let x = 0; x < 360; x+=15) {
        push();
        rotateZ(z)
        rotateX(x)
        translate(0, height, 0)
        push();
        fill("magenta")
        sphere(size);
        pop();
        fill(0)
        box(size+50);
        pop();
        if (keyTyped(87)) {
          size = random(100, 500)
        }
      }
    }
}
}

function draw(){
  screenSwitch();
  sphereThing();
}
