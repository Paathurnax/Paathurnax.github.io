// fireworks oop
// November 18th, 2024

class Fireworks {
  constructor(x, y, dx, dy, dz, size, r, g, b) {
    this.x = x;
    this.y = y;
    this.z = 0;
    this.dx = dx;
    this.dy = dy;
    this.dz = dz;
    this.size = size;
    this.r = r;
    this.g = g;
    this.b = b;
    this.opacity = 255;
  }

  update() {
    this.x+=this.dx;
    this.y+=this.dy;
    this.z+=this.dz;
    this.opacity--;
  }

  display() {
    fill(this.r, this.g, this.b, this.opacity);
    translate(this.x, this.y);
    sphere(this.size);
    noSmooth();
    noStroke();
    
  }

  isDead() {
    return this.opacity <= 0;
  }
}

let theFire = [];
const AMOUNT = 50;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  orbitControl();
}

function draw() {
  background(0);
  for (let firework of theFire) {
    if (firework.isDead) {
      let index = theFire.indexOf(firework);
      theFire.splice(index, 1);
    }
    else {
      firework.display();
      firework.update();
    }
  }
}

function mousePressed() {
  for (let i = 0; i<AMOUNT; i++) {
    let someParticle = new Fireworks(mouseX, mouseY, random(-5, 10), random(-5, 10), random(-5, 10), 10, 255, 45, 0);
    theFire.push(someParticle);
  }
}
