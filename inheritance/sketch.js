// Inheritance demo oop
// December 3rd, 2024


class Shape {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  display() {
    noStroke();
    fill(this.color);
  }

  move() {
    this.x += random(-2, 2);
    this.y+=random(-2, 2);
  }
}

class Circle extends Shape {
  constructor(x, y, color, radius) {
    super(x, y, color);
    this.radius = radius;
  }

  display() {
    super.display();
    circle(this.x, this.y, this.radius*2);
  }
}

class Square extends Shape {
  constructor(x, y, color, size) {
    super(x, y, color);
    this.size = size;
  }

  display() {
    super.display();
    square(this.x, this.y, this.size);
  }
}

let shapes = [];
const SHAPEAMOUNT = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<SHAPEAMOUNT; i++) {
    if (random(100) < 50) {
      let theCircle = new Circle(random(width), random(height), color(random(255), random(255), random(255), random(20, 50)));
      shapes.push(theCircle);
    }
    else {
      let theSquare = new Square(random(width), random(height), color(random(255), random(255), random(255), random(20, 50)));
      shapes.push(theSquare);
    }
  }
}

function draw() {
  background(220);

  for (thing of shapes) {
    thing.display();
    thing.move();
  }
}
