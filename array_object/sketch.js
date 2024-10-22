// Arrays and Object Notation Assignment
// Jacob Koshman
// October 21, 2024
//
// Extra for Experts:
// used classes and cameras + buttons


//initializing the variables
let base;
let ball;
let state = "title";
let startButton;
let ballResetButton;
let objectColorChangeButton;
let baseResetButton;
let cam;
let colorArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  //creating and initializing the buttons
  startScreenButton();
  ballButton();
  objectColorButton();
  baseButton();

  //tells the user how to manipulate the base
  alert("use the arrow keys to tilt the base");
  
  //intializing the objects
  createBase();
  createBall();
}

function draw() {
  //sets the background color and implements the state variable "start"
  background(0);
  stateStuff();
}

//runs if the start button is clicked
function stateStuff() {
  if (state === "start") {

    //hides the first button
    startButton.hide();

    //shows the second button
    ballResetButton.show();

    //shows the third button
    objectColorChangeButton.show();

    //shows the fourth button
    baseResetButton.show();
    

    //creates a perspective "shot" of the 3d environment
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
function startScreenButton() {
  if (state === "title") {
    startButton = createButton("click to start!");
    startButton.size(500, 250);
    startButton.style("font-size", "50px");
    startButton.show();
    startButton.center();
    startButton.mouseClicked(changeState);
  }
}

//creates the second button
function ballButton() {
  ballResetButton = createButton("Return Ball");
  ballResetButton.hide();
  ballResetButton.position(width/4, height/2);
  ballResetButton.mouseClicked(createBall);
}

//creates the third button
function objectColorButton() {
  objectColorChangeButton = createButton("Change Color");
  objectColorChangeButton.hide();
  objectColorChangeButton.position(width/4, height/2 + 35);
  objectColorChangeButton.mouseClicked(actuallyChangeColor);
}

//creates the fourth button
function baseButton() {
  baseResetButton = createButton("Reset Base");
  baseResetButton.hide();
  baseResetButton.position(width/4, height/2 + 70);
  baseResetButton.mouseClicked(createBase);
}

//randomizes the objects rgb values
function objectColor() {
  let color = {
    r: random(255),
    g: random(255),
    b: random(255),
  };
  colorArray.push(color);
}

//changes the objects color
function changeColor() {
  for (let colors of colorArray) {
    fill(colors.r, colors.g, colors.b);
  }
}

//both color functions put together to make my life easier
function actuallyChangeColor() {
  objectColor();
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

//creates the base
class Base {
  constructor(x, y, z, w, h, d) {
    this.position = createVector(x, y, z);
    this.rotate = createVector(0, 0, 0);

    this.w = w;
    this.h = h;
    this.d = d;
  }

  //rotates the base
  rotation() {
    if (keyIsPressed) {
      if (keyCode === UP_ARROW && this.rotate.x>-0.50) {
        this.rotate.x -= 0.01;
      }
      else if (keyCode === DOWN_ARROW && this.rotate.x<0.50) {
        this.rotate.x += 0.01;
      }
      else if (keyCode === LEFT_ARROW && this.rotate.z<0.50) {
        this.rotate.z += 0.01;
      }
      else if (keyCode === RIGHT_ARROW && this.rotate.z>-0.50) {
        this.rotate.z -= 0.01;
      }
    }
  }

  //displays the base
  displayBox() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    translate(0, -this.h/2, 0);
    rotateX(this.rotate.x);
    rotateZ(this.rotate.z);
    box(this.w, this.h, this.d);
    pop();
  }
}


//creates ball and applys physics
class Ball {
  constructor(x, y, z, r) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector();
    this.radius = r;
    this.mass = 1;
  }

  //rolling the ball
  rollOn(floor) {
    let force = createVector(-floor.rotate.z, 0, floor.rotate.x);
    force.mult(0.2);
    this.applyForce(force);
  }

  //gravity
  fallFrom(floor) {
    if (
      this.position.x < -floor.w / 2 ||
      this.position.x > floor.w / 2 ||
      this.position.z < -floor.d / 2 ||
      this.position.z > floor.d / 2
    ) {
      let gravity = createVector(0, -1, 0);
      this.applyForce(gravity);
    }
  }

  //move the ball
  updatePosition() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  //mass and acceleration
  applyForce(f) {
    if (this.mass <= 0) {
      console.log("Wrong mass!");
      return;
    }

    let force = p5.Vector.div(f, this.mass);
    this.acceleration.add(force);
  }

  //changes the balls velocity
  adjustVelocity(amount) {
    this.velocity.mult(1 + amount);
  }

  //displays the ball properly
  displayOn(floor) {
    push();
    translate(floor.position.x, floor.position.y, floor.position.z);
    rotateX(floor.rotate.x);
    rotateZ(floor.rotate.z);
    translate(0, this.radius, 0);
    translate(this.position.x, this.position.y, this.position.z);
    sphere(this.radius, 12, 12);
    pop();
  }
}