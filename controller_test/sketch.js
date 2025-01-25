// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  if (Controller.supported) {
    Controller.search();
  }

  else {
    alert("oopsies, use a supported controller");
  }

  window.addEventListener('gc.button.press', function(event)) {
    let button = event.detail;
    console.log(button);
  }
}

function draw() {
  background(220);
}


function controllerStuff() {
  
}