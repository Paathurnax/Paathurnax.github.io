// Sierpinksi Triangle
// December 18th, 2024

let initalTriangle = [
  {x: 625, y: 50},
  {x: 50, y: 750},
  {x: 1200, y: 750}


];
let theDepth = 0;
let theColors = ["blue", "green", "yellow", "red", "teal", "purple", "black", "orange", "burgundy", "cyan", "lightpurple"];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  sierpinksi(initalTriangle, theDepth);
}

function mousePressed() {
  if (theDepth<10) {
    theDepth++;
  }
}

function sierpinksi(points, depth) {
  fill(theColors[depth]);
  noStroke();
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (depth>0) {
    sierpinksi([points[0], midPoint(points[0], points[1]), midPoint(points[0], points[2])], depth-1);
    sierpinksi([points[1], midPoint(points[0], points[1]), midPoint(points[1], points[2])], depth-1);
    sierpinksi([points[2], midPoint(points[0], points[2]), midPoint(points[1], points[2])], depth-1);
  }
}


function midPoint(point1, point2) {
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x:midX, y:midY};
}