// walker oop
// November 13, 2024

class Walker {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.radius = 5;
    this.color = color;
  }
  display() {
    circle(this.x, this.y, this.radius*2);
    fill(this.color);
    noStroke();
  }
  move() {
    let direction = random(100);
    if (direction < 25) {
      this.y -= this.speed;
    }
    else if (direction < 50) {
      this.y += this.speed;
    }
    else if (direction < 75) {
      this.x -= this.speed;
    }
    else {
      this.x += this.speed;
    }
  }
}

let walkerArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  let luc = new Walker(width/2, height/2, "red");
  walkerArray.push(luc);
}

function draw() {
  for (let theWalker of walkerArray) {
    theWalker.display();
    theWalker.move();
  }
  
}

function mousePressed() {
  let randomColor = color(random(255), random(255), random(255));
  let someWalker = new Walker(mouseX, mouseY, randomColor);
  walkerArray.push(someWalker);
}