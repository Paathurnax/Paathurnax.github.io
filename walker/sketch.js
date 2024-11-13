// walker oop
// November 13, 2024

class Walker {
  constructor(x, y, speed, radius) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.radius = radius;
  }
  display() {
    circle(this.x, this.y, this.radius*2);
  }
  move() {
    if (keyIsPressed) {
      if (key === "w") {
        this.y -= this.speed;
      }
      if(key === "s") {
        this.y += this.speed;
      }
      if(key === "d") {
        this.x += this.speed;
      }
      if(key === "a") {
        this.x -= this.speed;
      }
    }
  }
}

let thing;
let thing2;
let thing3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  thing = new Walker(width/2, height/2, 25, 25);
  thing2 = new Walker(width/2 + 25, height/2 + 25, 25, 25);
  thing3 = new Walker(width/2 + 50, height/2 + 50, 25, 25);
}

function draw() {
  thing.display();
  thing2.display();
  thing3.display();
  thing.move();
  thing2.move();
  thing3.move();
}
