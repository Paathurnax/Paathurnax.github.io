// Arrays and Object Notation Assignment
// Jacob Koshman
// October 21, 2024
//
// Extra for Experts:
// used classes


let textFont;
let base;
let ball;
let state = "title";
let button;
let button2;
let colorArray = [];
let count = 0;



function preload() {
  //loading text font
  textFont = loadFont("Inconsolata.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //initial screen
  if (state === "title") {
    button = createButton("click me to start!");
    button.show();
    button.center();
    button.mousePressed(changeState);
  }
  //intializing the objects
  base = new Base(0, -150, 0, 300, 10, 300);
  ball = new Ball(0, 0, 0, 10);
}

function draw() {
  stateStuff();
  
}

//runs if the start button is clicked
function stateStuff() {
  if (state === "start") {

    //changes the background color
    bgColor();

    //hides the button
    button.hide();

    //lets the user manipulate the perspective
    orbitControl();

    //flips the y axis
    scale(1, -1, 1);

    //creates the base and places it where it should be
    base.rotation();
    base.displayBox();

    //creates the ball and runs its class functions
    ball.rollOn(base);
    ball.fallFrom(base);
    ball.updatePosition();
    ball.displayOn(base);
  }
}


//changes the state on button press
function changeState() {
  state = "start";
}

//randomizes the background color
function bgColor() {
  let color = {
    r: 67,
    g: 86,
    b: 123,
  };
  colorArray.push(color);
  changeColor(colorArray[0], colorArray[1], colorArray[2]);
}


//changes the color
function changeColor(r, g, b) {
  background(r, g, b);
}

//creates the base and applys rotation on key press
class Base {
  constructor(x, y, z, w, h, d) {
    this.pos = createVector(x, y, z);
    this.rot = createVector(0, 0, 0);

    this.w = w;
    this.h = h;
    this.d = d;
  }
  rotation() {
    if (keyIsPressed) {
      if (keyCode === UP_ARROW) {
        this.rot.x -= 0.01;
      }
      else if(keyCode === DOWN_ARROW) {
        this.rot.x += 0.01;
      }
      else if(keyCode === LEFT_ARROW) {
        this.rot.z += 0.01;
      }
      else if(keyCode === RIGHT_ARROW) {
        this.rot.z -= 0.01;
      }
    }
  }

  displayBox() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    translate(0, -this.h/2, 0);
    rotateX(this.rot.x);
    rotateZ(this.rot.z);
    box(this.w, this.h, this.d);
    pop();
  }
}


//creates ball and applys physics
class Ball {
  constructor(x, y, z, r) {
    this.pos = createVector(x, y, z);
    this.vel = createVector(0, 0, 0);
    this.acc = createVector();
    this.rad = r;
    this.mass = 1;
  }
  rollOn(area) {
    let force = createVector(-area.rot.z, 0, area.rot.x);
    force.mult(0.2);
    this.applyForce(force);
  }
  fallFrom(area) {
    if (
      this.pos.x < -area.w / 2 ||
      this.pos.x > area.w / 2 ||
      this.pos.z < -area.d / 2 ||
      this.pos.z > area.d / 2
    ) {
      let gravity = createVector(0, -1, 0);
      this.applyForce(gravity);
    }
  }
  updatePosition() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass!");
      return;
    }
    let force = p5.Vector.div(f, this.mass);
    this.acc.add(force); // force accumulation
  }
  adjustVelocity(amount) {
    this.vel.mult(1 + amount);
  }
  displayOn(area) {
    push();
    translate(area.pos.x, area.pos.y, area.pos.z);
    rotateX(area.rot.x);
    rotateZ(area.rot.z);
    
    translate(0, this.rad, 0);
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(this.rad, 12, 12);
    
    pop();
  }
}