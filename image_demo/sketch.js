// Image Demo
// September 23, 2024

let spongebob;

function preload() {
  spongebob = loadImage("squid.webp")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  image(spongebob, mouseX, mouseY)
}
