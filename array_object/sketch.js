// Arrays and Object Notation Assignment
// Jacob Koshman
// October 21, 2024
//
// Extra for Experts:
// used classes and cameras + buttons


let base;
let ball;
let state = "title";
let button;
let button2;
let button3;
let cam;
let colorArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  //sets the initial background color
  background(255);
  
  //title screen + start button
  firstButton();

  //return ball button
  secondButton();

  //change background color button
  thirdButton();
  
  //intializing the objects
  createBase();
  createBall();
}

function draw() {
  stateStuff();
}

//runs if the start button is clicked
function stateStuff() {
  if (state === "start") {

    //shows the second button
    button2.show();

    //shows the third button
    button3.show();
    
    //hides the first button
    button.hide();

    //lets the user manipulate the perspective
    createCam();

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

//create the perspective
function createCam() {
  cam = createCamera();
  cam.setPosition(0, 0, 800);
}

//creates the first button
function firstButton() {
  if (state === "title") {
    button = createButton("click to start!");
    button.size(500, 250);
    button.style("font-size", "50px");
    button.show();
    button.center();
    button.mousePressed(changeState);
  }
}

//creates the second button
function secondButton() {
  button2 = createButton("Return Ball");
  button2.hide();
  button2.position(width-100, height-50);
  button2.mousePressed(createBall);
}

//creates the third button
function thirdButton() {
  button3 = createButton("Change Background Color");
  button3.hide();
  button3.position(width-100, height-100);
  button3.mousePressed(actuallyChangeColor);
}

//randomizes the background rgb values
function bgColor() {
  let color = {
    r: random(255),
    g: random(255),
    b: random(255),
  };
  colorArray.push(color);
}


//changes the background color
function changeColor() {
  for (let colors of colorArray) {
    background(colors.r, colors.g, colors.b);
  }
}

//actually changes the color
function actuallyChangeColor() {
  bgColor();
  changeColor();
}

//creates the base
function createBase() {
  base = new Base(0, -150, 0, 300, 10, 300);
}

//creates the ball
function createBall() {
  ball = new Ball(0, 0, 0, 10);
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
      if (keyCode === UP_ARROW && this.rot.x>-0.50) {
        this.rot.x -= 0.01;
      }
      else if(keyCode === DOWN_ARROW && this.rot.x<0.50) {
        this.rot.x += 0.01;
      }
      else if(keyCode === LEFT_ARROW && this.rot.z<0.50) {
        this.rot.z += 0.01;
      }
      else if(keyCode === RIGHT_ARROW && this.rot.z>-0.50) {
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
    this.acc.add(force);
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