// Grid Demo
// October 22nd 2024

//if hardcoding the grid
// let grid = [[1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0]];

let grid;

const GRID_SIZE = 4;
let cellSize;

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandGrid(GRID_SIZE, GRID_SIZE);
  }
  if (key === "e") {
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
}
  

function generateRandGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<cols; y++) {
    newGrid.push([]);
    for (let x = 0; x<rows; x++) {
      //choose either 0 or 1 each 50% chance
      if (random(100) < 50) {
        newGrid[y].push(1);
      }

      else {
        newGrid[y].push(0);
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
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        fill("black");
      }

      else if (grid[y][x] === 0) {
        fill("white");
      }

      square(x*cellSize, y*cellSize, cellSize);
      
    }
  }
}

function mousePressed() {
  
}
