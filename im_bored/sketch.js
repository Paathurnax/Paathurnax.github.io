// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"



function setup() {
  createCanvas(windowWidth, windowHeight);
  let ball = new Ball;
}

function draw() {
  background(220);
  ball.functions();
}

class Ball {
  constructor() {
    this.x = width/2;
    this.y = height/2;
    this.xspeed = 10;
    this.yspeed = 15;
    this.radius = 10;
  }

  makeBall() {
    circle(this.x, this.y, this.radius*2);
  }

  moveBall() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  bounce() {
    if (this.x >= width - this.radius || this.x < this.radius) {
      this.xspeed *= -1;
    }

    if (this.y >= height - this.radius || this.y < this.radius) {
      this.yspeed *= -1;
    }
  }

  functions() {
    this.makeBall();
    this.moveBall();
    this.bounce();
  }
}