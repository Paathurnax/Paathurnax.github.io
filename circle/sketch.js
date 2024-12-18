// Fractal Circles Demo
// December 18th, 2024



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  recCircle(width/2, height/2, mouseX);
}

function recCircle(x, y, radius) {
  circle(x, y, radius*2);

  if (radius > 30) {
    recCircle(x - radius/2, y, radius/2);
    recCircle(x + radius/2, y, radius/2);
    recCircle(x - radius/2, y-radius/2, radius/2);
    recCircle(x + radius/2, y+radius/2, radius/2);
    recCircle(x - radius/2, y, radius/2);
    recCircle(x - radius/2, y, radius/2);
  }
}