// Grid Based Assignment
// Jacob Koshman
// November ... 
//
// Extra for Experts:
// - used 3d arrays

const GRID_SIZE = 21; 
let boxSize = 10; 
let grid = [];
let colorShade = 0; 

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

function createGrid() {
  for (let i=0; i<GRID_SIZE; i++) {
    grid[i] = [];
    for (let j=0; j<GRID_SIZE; j++) {
      grid[i][j] = [];
      for (let k=0; k<GRID_SIZE; k++) {
        
        let middle = GRID_SIZE/2;
        let margin = 1;
        let min = middle - margin;
        let max = middle + margin; 
        
        if (i >= min && i <= max &&
           j >= min && j <= max &&
           k >= min && k <= max) {
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
          fill(colorShade, 255, 255);
        } else {
          fill("black");
        }
        
        push();
        translate(i*boxSize, j*boxSize, k*boxSize);
        box(boxSize);
        pop();
      }
    }
  }
  
  //changes the grid if a key is pressed
  if (keyIsPressed) {
    update();
    if (colorShade > 255) {
      colorShade = 0;
    }
    colorShade += 5;
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
        let a = 1;
        let b = 10;
        let c = 1;
        let d = 10;

        if (grid[i][j][k] == 1) {
          if (n >= a && n <= b) {
            nextGen[i][j][k] = 1;
          } else {
            nextGen[i][j][k] = 0;
          }
        } else {
          if (n >= c && n <= d) {
            nextGen[i][j][k] = 1;
          } else {
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
  for (let i=-1; i<2; i++) {
    for (let j=-1; j<2; j++) {
      for (let k=-1; k<2; k++) {
        let xIndex = (x + i + GRID_SIZE) % GRID_SIZE;
        let yIndex = (y + j + GRID_SIZE) % GRID_SIZE;
        let zIndex = (z + k + GRID_SIZE) % GRID_SIZE;
        sum += grid[xIndex][yIndex][zIndex];
      }
    }
  }
  sum -= grid[x][y][z];
  return sum;
  
}