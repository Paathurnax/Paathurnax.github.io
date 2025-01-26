// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (Controller && Controller.supported) {
    Controller.search();
  }

  else {
    alert("oopsies, use a supported controller");
  }

  window.addEventListener('gc.analog.hold', function(event) {
    let button = event.detail;
    controllerStuff(button);
  }, false);

  window.addEventListener('gc.button.press', function(event) {
    let button = event.detail;
    ballStuff(button);
  }, false);
  paddle = new Paddle();
  ballArray.push(new Ball(5, 6));
  rectMode(CENTER);
}

function draw() {
  background(220);
  paddle.display();
  for (let ball of ballArray) {
    ball.display();
    ball.move();
    ball.bounce();
    ball.reset();
  }
}

class Paddle {
  constructor() {
    this.x = width/2;
    this.size = 200;
    this.height = this.size/5;
    this.speed = this.size/16;
    this.y = height-this.height/2;
  }

  display() {
    rect(this.x, this.y, this.size, this.height);
  }

  move(dir) {
    if (dir === "right" && this.x < width - this.size/2) {
      this.x+=this.speed;
    }

    if (dir === "left" && this.x > this.size/2) {
      this.x-=this.speed;
    }
  }
}

class Ball {
  constructor(xSpeed, ySpeed) {
    this.pos = createVector(width/2, height/2);
    this.vel = createVector(xSpeed, ySpeed);
    this.radius = 10;
  }

  display() {
    circle(this.pos.x, this.pos.y, this.radius*2);
  }

  move() {
    this.pos.add(this.vel);
  }

  bounce() {
    if (this.pos.x < this.radius 
    || this.pos.x > width-this.radius) {
      this.vel.x *= -1;
    }

    if (this.pos.y < this.radius
    || this.pos.y > paddle.y - this.radius - paddle.height/2 
    && this.pos.x < paddle.x + paddle.size/2 
    && this.pos.x > paddle.x - paddle.size/2) {
      this.vel.y *=-1;
    }
  }

  reset() {
    if (this.pos.y > paddle.y) {
      this.pos.y = height/2;
      this.pos.x = width/2;
    }
  }
}


function controllerStuff(button) {
  if (button.name === "LEFT_ANALOG_STICK") {
    if (button.position.x < -0.5) {
      paddle.move("left");
    }

    else if (button.position.x > 0.5) {
      paddle.move("right");
    }
  }
}

function ballStuff(button) {
  if (button.name === "FACE_1") {
    ballArray.push(new Ball(5, 6));
  }
}

// (this.pos.x > paddle.x - paddle.size/2 
//   && this.pos.y < paddle.y+paddle.height/2)
//   || (this.pos.x < paddle.x +paddle.size/2
//   && this.pos.y < paddle.y + paddle.height/2)

// || this.pos.y < paddle.y + paddle.height/2
//       && this.pos.x < paddle.x + paddle.size/2 
//       && this.pos.x > paddle.x - paddle.size/2