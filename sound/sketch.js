// Sound Effects Demo
// October 16, 2024

let bgMusicLoop;
let clickSound;

function preload() {
  bgMusicLoop = loadSound("bgmusic.mp3");
  clickSound = loadSound("potpickup.ogg");
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  bgMusicLoop.amp(0.3);
  clickSound.amp(1.0);
}

function draw() {
  background(220);
}

function keyPressed() {
  if (!bgMusicLoop.isPlaying()) {
    bgMusicLoop.loop();
  }
}

function mousePressed() {
  clickSound.play();
}