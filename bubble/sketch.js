// bubble object natation demo
// showing how to delete objects from the array

let theBubbles = [];
let deathLocations = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < 5; i++) {
    spawnBubble();
  }

  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(220);
  // randomBubbles();
  noiseBubble();
  displayBubbles();
  displayGraves();
}

function displayGraves() {
  for (let grave of deathLocations) {
    textAlign(CENTER, CENTER);
    fill("black");
    text("X", grave.x, grave.y);
  }
}

function mousePressed() {
  for ( let bubble of theBubbles) {
    if (clickedOnBubble(mouseX, mouseY, bubble)) {
      let theIndex = theBubbles.indexOf(bubble);
      theBubbles.splice(theIndex, 1);
      undertaker(mouseX, mouseY);
    }
  }
}

function undertaker(theX, theY) {
  let grave = {
    x: theX,
    y: theY,
  };
  deathLocations.push(grave);
}

function clickedOnBubble(x, y, theBubble) {
  let distanceAway = dist(x, y, theBubble.x, theBubble.y);
  return distanceAway < theBubble.radius;
}

function noiseBubble() {
  for (bubble of theBubbles) {
    bubble.x = noise(bubble.timeX) * width;
    bubble.y = noise(bubble.timeY) * height;
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
  }
}

function randomBubbles() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice<50) {
      bubble.y-=bubble.speed;
    }
    else if (choice < 60) {
      bubble.y+=bubble.speed;
    }
    else if (choice < 70) {
      bubble.x+=bubble.speed;
    }
    else {
      bubble.x-=bubble.speed;
    }
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    noStroke();
    fill(bubble.r, bubble.g, bubble.b, bubble.alpha);
    circle(bubble.x, bubble.y, bubble.radius * 2);
  }
}

function spawnBubble() {
  let someBubble = {
    x: random(0, width),
    y: height + random(0, 50),
    speed: random(2, 5),
    radius: random(20, 40),
    r: random(255),
    g: random(255),
    b: random(255),
    alpha: random(255),
    timeX: random(10000000000),
    timeY: random(10000000000),
    deltaTime: 0.005,
  };
  theBubbles.push(someBubble);
}