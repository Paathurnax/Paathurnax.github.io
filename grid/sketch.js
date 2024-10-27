// Grid Demo
// October 22nd 2024

//if hardcoding the grid
// let grid = [[1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0]];

let grid;

const GRID_SIZE = 40;
let cellSize;
let shouldToggleNeighbours = false;
let autoPlayIsOn = false;
let renderOnFrameMultiple = 5;
let goober;
let boxCount = 0;

function preload() {
  goober = loadJSON("gosper.json");
}

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
  if (autoPlayIsOn && frameCount % renderOnFrameMultiple === 0) {
    grid = updateGrid();
  }
  createCam();
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
  if (key === " ") {
    grid = updateGrid();
  }
  if (key === "a") {
    autoPlayIsOn = !autoPlayIsOn;
  }
  if (key === "g") {
    grid = goober;
  }
}

function updateGrid() {
  //make a new array to hold the next turn
  let nextTurn = generateEmptyGrid(GRID_SIZE, GRID_SIZE);

  //look at every cell
  for (let y = 0; y<GRID_SIZE; y++) {
    for (let x = 0; x<GRID_SIZE; x++) {
      //count the neighbours
      let neighbours = 0;

      for(let i = -1; i<=1; i++) {
        for (let j = -1;j<=1;j++) {
          //dont make stupid
          if (y+i>=0 && y+i<GRID_SIZE && x+j>=0 && x+j < GRID_SIZE) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //dont count self
      neighbours -= grid[y][x];

      //apply the rules of the game
      if (grid[y][x] === 0) {
        //currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 1) {
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

    }
  }
  return nextTurn;
}
  

function generateRandGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<rows; y++) {
    newGrid.push([]);
    for (let x = 0; x<cols; x++) {
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
