// Local Storage Demo
// December 2nd, 2024

let clickNum = 0;
let high = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (getItem("highscore")) {
    high = getItem("highscore");
  }
}

function draw() {
  background(220);
  displayClicks();
  showHighest();
}

function displayClicks() {
  fill("black");
  textSize(75);
  text(clickNum, 100, height/2);
}

function showHighest() {
  fill("green");
  textSize(75);
  text(high, 400, height/2);
}

function mousePressed() {
  clickNum++;
  if (clickNum>high) {
    high = clickNum;
    storeItem("highscore", high);
  }
}