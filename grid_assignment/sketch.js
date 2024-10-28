// Grid Based Assignment
// Jacob Koshman
// November ... 
//
// Extra for Experts:
// - used 3d arrays

const GRID_SIZE = 20; 
let boxSize = 20; 
let grid = [];
let changeDelay = 10; 

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(HSB, 255);
  createGrid();
}

function draw() {
  background(255);
  orbitControl();
  fillGrid();
}

function keyPressed() {
  if (key === "r") {
    createGrid();
  }
}

function createGrid() {
  for (let i=0; i<GRID_SIZE; i++) {
    grid[i] = [];
    for (let j=0; j<GRID_SIZE; j++) {
      grid[i][j] = [];
      for (let k=0; k<GRID_SIZE; k++) {        
        if (random(100) < 50) {
          grid[i][j][k] = 1;
        } else {
          grid[i][j][k] = 0;
        }
      }
    }
  }
}

function fillGrid() {
  translate(-boxSize*GRID_SIZE/2 + boxSize/2, 
            -boxSize*GRID_SIZE/2 + boxSize/2, 
           -boxSize*GRID_SIZE/2 + boxSize/2);
  
  for (let i=0; i<GRID_SIZE; i++) {
    for (let j=0; j<GRID_SIZE; j++) {
      for (let k=0; k<GRID_SIZE; k++) {
        if (grid[i][j][k] == 1) {
          fill("black");
          stroke("blue");
        } else {
          noFill();
          stroke("black"); 
        }
        
        push();
        translate(i*boxSize, j*boxSize, k*boxSize);
        box(boxSize - boxSize/4);
        pop();
      }
    }
  }
  
  //changes the grid if a key is pressed
  if (frameCount % changeDelay === 0) {
    update();
  }
}


//changes the grid
function update() {
  let nextGen = [];
  for (let i=0; i<GRID_SIZE; i++) {
    nextGen[i] = [];
    for (let j=0; j<GRID_SIZE; j++) {
      nextGen[i][j] = [];
      for (let k=0; k<GRID_SIZE; k++) {
   
        let n = neighboringStates(grid, i, j, k);

        if (grid[i][j][k] === 1) {
          if (n === 2 || n === 3) {
            nextGen[i][j][k] = 1;
          } 
          else {
            nextGen[i][j][k] = 0;
          }
        } 
        else if (grid[i][j][k] === 0) {
          if (n === 3) {
            nextGen[i][j][k] = 1;
          } 
          else {
            nextGen[i][j][k] = 0;
          }


        }
      }
    }
  }
  grid = nextGen;
}


//finds and adds together the neighbouring boxes
function neighboringStates(grid, x, y, z) {
  let sum = 0;
  for (let i=-1; i<1; i++) {
    for (let j=-1; j<1; j++) {
      for (let k=-1; k<1; k++) {
        if (y+i>=0 && y+i<GRID_SIZE && x+j>=0 && x+j < GRID_SIZE && z+k>=0 && z+k < GRID_SIZE) {
          try {
            sum += grid[x+i][y+j][z+k];
          }
          catch {
            sum = sum;
          }
          
        }
      }
    }
  }
  sum -= grid[x][y][z];
  return sum;
  
}