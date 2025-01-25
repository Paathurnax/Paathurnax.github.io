// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let ballArray = [];
const MAXBALLS = 10;
const BALLSIZE = 30;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let i = 0; i<MAXBALLS; i++) {
    ballArray.push(new Ball(width/2, height/2, width/2, BALLSIZE, random(5, 10), random(5, 10), random(5, 10)));
  }
}

function draw() {
  background(220);
  ballStuff();
  orbitControl();
  
}

class Ball {
  constructor(x, y, z,  radius, xSpeed, ySpeed, zSpeed) {
    this.pos = createVector(x, y, z);
    this.radius = radius;
    this.vel = createVector(xSpeed, ySpeed, zSpeed);
    this.boxSize = this.radius*10;
    this.whatever = this.boxSize/2 - this.radius;
  }
  
  display() {
    push();
    fill("blue");
    stroke("purple");
    sphere(this.radius*2); 
    translate(this.pos.x, this.pos.y, this.pos.z);  
    pop();
  }
  
  move() {
    this.pos.add(this.vel);
  }
  
  bounce() {
    if (this.pos.x > this.whatever || this.pos.x < -this.whatever) {
      this.vel.x *= -1;
    }
    
    if (this.pos.y > this.whatever || this.pos.y < -this.whatever) {
      this.vel.y *= -1;
    }

    if (this.pos.z > this.whatever || this.pos.z < -this.whatever) {
      this.vel.z *= -1;
    }
  }

  makeBox() {
    push();
    noFill();
    stroke(100);
    strokeWeight(5);
    box(this.boxSize);
    pop();
  }
    
  // checkIfClicked() {
  //   if (mouseX < this.x + this.radius && mouseX > this.x-this.radius && mouseY < this.y + this.radius && mouseY > this.y - this.radius) {
  //     return true;
  //   }
  // }
}

function ballStuff() {
  for (let ball of ballArray) {
    ball.bounce();
    ball.move();
    ball.makeBox();
    ball.display();
  }
}

// function mousePressed() {
//   for (let ball of ballArray) {
//     if (ball.checkIfClicked()) {
//       let index = ballArray.indexOf(ball);
//       ballArray.splice(index, 1);
//     }
//   }
// }

function keyPressed() {
  ballArray.push(new Ball(width/2, height/2, width/2, BALLSIZE, random(5, 10), random(5, 10), random(5, 10)));
}