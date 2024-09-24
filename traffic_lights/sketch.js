// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let c1 = ("white")
let c2 = ("white")
let c3 = ("white")
let time1 = 2000;


function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  colorChange();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(c1)
  ellipse(width/2, height/2 - 65, 50, 50); //top
  fill(c2)
  ellipse(width/2, height/2, 50, 50); //middle
  fill(c3)
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
function colorChange() {
  if (millis() < time1) {
    c1 = ("white")
    c2 = ("white")
    c3 = ("green")
  }
  else if (millis() < time1 + 1500) {
    c1 = ("white")
    c2 = ("yellow")
    c3 = ("white")
  }
  else if (millis() < time1 + 500){
    c1 = ("red")
    c2 = ("white")
    c3 = ("white")
    time1+=2000
  }
}