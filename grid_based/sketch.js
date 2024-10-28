// Grid Based Assignment
// Jacob Koshman
// November...
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let grid;

const GRID_SIZE = 10;
let cellSize;
let shouldToggleNeighbours = true;
let boxCount = 0;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth, WEBGL);
  }
  else {
    createCanvas(windowHeight, windowHeight, WEBGL);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  orbitControl();
  displayGrid();
}

function createCam() {
  cam = createCamera();
  cam.setPosition(width/2, height/2, 2000);
}

// function mousePressed() {
//   let x = Math.floor(mouseX/cellSize);
//   let y = Math.floor(mouseY/cellSize);

//   toggleCell(x, y);

//   if (shouldToggleNeighbours === true) {
//     toggleCell(x + 1, y);
//     toggleCell(x - 1, y);
//     toggleCell(x, y + 1);
//     toggleCell(x, y - 1);

//   }
// }

function toggleCell(x, y) {
  //bs check
  if(x>=0 && y>=0 && x<GRID_SIZE && y<GRID_SIZE){
    if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
    else {
      grid[y][x] = 1;
    }

  }
}

function windowResized() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth, WEBGL);
  }
  else {
    resizeCanvas(windowHeight, windowHeight, WEBGL);
  }
  cellSize = height/GRID_SIZE;
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "n") {
    shouldToggleNeighbours = !shouldToggleNeighbours;
  }
}
  

function generateRandGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<rows; y++) {
    newGrid.push([]);
    for (let x = 0; x<cols; x++) {
      //choose either 0 or 1 each 50% chance
      if (random(100) < 50) {
        newGrid[y][x] = 1;
      }

      else {
        newGrid[y][x] = 0;
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<cols; y++) {
    newGrid.push([]);
    for (let x = 0; x<rows; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function displayGrid() {

  translate(-cellSize*GRID_SIZE/2 + cellSize/2, 
    -cellSize*GRID_SIZE/2 + cellSize/2);
  for (let y = 0; y < GRID_SIZE; y++) {
    boxCount = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }

      else if (grid[y][x] === 0) {
        fill("silver");
      }

      box(cellSize);
      if (boxCount === GRID_SIZE-1) {
        translate(-(cellSize*GRID_SIZE) + cellSize, cellSize, 0)
      }
      else {
        translate(cellSize, 0, 0)
      }

      boxCount++;
    }
  }
}