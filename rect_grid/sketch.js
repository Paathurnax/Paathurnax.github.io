// rectangle demo
// October 28th 2024

const CELL_SIZE = 25;
let grid;
let rows;
let cols;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = genRandGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid(grid);
}

function genRandGrid(cols, rows) {
  let newGrid = [];
  for (let x = 0; x < cols; x++) {
    newGrid.push([]);
    for (let y = 0; y < rows; y++) {
      if (random(100)>50) {
        newGrid[x][y] = 1;
      }
      else {
        newGrid[x][y] = 0;
      }
      
      
    }
  
  }
  return newGrid;
}

function displayGrid(grid) {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y] === 1) {
        fill("black");
      }
      else {
        fill("white");
      }

      rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE/2);
    }
  }
}
