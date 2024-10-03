//bouncing theBall demo
//october 3rd

let arr = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i<1000; i++) {
    spawnBall(width/2, height/2);
  }
}

function draw() {
  background(220);

  for (let theBall of arr) {
    
    theBall.x+=theBall.dx
    theBall.y+=theBall.dy
  
    if (theBall.x > width-theBall.radius || theBall.x < theBall.radius) {
      theBall.dx*=-1
    }
    if (theBall.y > height-theBall.radius || theBall.y < theBall.radius) {
      theBall.dy*=-1
    }
  
  
    //display the theBall
    noStroke();
    fill(theBall.red, theBall.green, theBall.blue, theBall.alpha)
    circle(theBall.x, theBall.y, theBall.radius*2)
  }

}

function mousePressed() {
  spawnBall(mouseX, mouseY)
}


function spawnBall(theX, theY) {
  let ball = {
    x: theX,
    y: theY,
    radius: random(1, 100),
    dy: 10,
    dx: random(-5, 5),
    red: random(255),
    green: random(255),
    blue: random(255),
    alpha: random(255),
  };
  
  arr.push(ball);
}