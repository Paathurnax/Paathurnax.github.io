// Grid Demo
// October 22nd 2024

//if hardcoding the grid
// let grid = [[1, 0, 1, 0],
//   [0, 0, 1, 1],
//   [1, 1, 1, 0],
//   [0, 1, 1, 0]];

let grid;

const GRID_SIZE = 10;
let cellSize;
let shouldToggleNeighbours = false;
const OPEN_TILE = 0;
const IMPASSIBLE_TILE = 1;
const PLAYER_TILE = 9;
let player = {
  x: 0,
  y: 0,
};
let grass;
let path;

function preload() {
  grass = loadImage("grass.png");
  path = loadImage("rock.jpg");
}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  cellSize = height/GRID_SIZE;
  grid = generateRandGrid(GRID_SIZE, GRID_SIZE);
  //add player to grid
  grid[player.y][player.x] = PLAYER_TILE;
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);

  if (shouldToggleNeighbours === true) {
    toggleCell(x + 1, y);
    toggleCell(x - 1, y);
    toggleCell(x, y + 1);
    toggleCell(x, y - 1);

  }
}

function toggleCell(x, y) {
  //bs check
  if(x>=0 && y>=0 && x<GRID_SIZE && y<GRID_SIZE){
    if (grid[y][x] === IMPASSIBLE_TILE) {
      grid[y][x] = OPEN_TILE;
    }
    else if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = IMPASSIBLE_TILE;
    }

  }
}

function windowResized() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
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
  if (key === "w") {
    movePlayer(player.x, player.y - 1);
  }
  if (key === "a") {
    movePlayer(player.x - 1, player.y);
  }
  if (key === "s") {
    movePlayer(player.x, player.y + 1);
  }
  if (key === "d") {
    movePlayer(player.x + 1, player.y);
  }
}
  

function generateRandGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y<rows; y++) {
    newGrid.push([]);
    for (let x = 0; x<cols; x++) {
      //choose either 0 or 1 each 50% chance
      if (random(100) < 50) {
        newGrid[y].push(IMPASSIBLE_TILE);
      }

      else {
        newGrid[y].push(OPEN_TILE);
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
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === IMPASSIBLE_TILE) {
        // fill("black");
        image(grass, x*cellSize, y*cellSize, cellSize);
      }

      else if (grid[y][x] === OPEN_TILE) {
        // fill("silver");
        image(path, x*cellSize, y*cellSize, cellSize);
      }

      else if (grid[y][x] === PLAYER_TILE) {
        fill("blue");
        square(x*cellSize, y*cellSize, cellSize);
      }

      
      
    }
  }
}

function movePlayer(x, y) {
  //dont run off the screen
  if (grid[y][x] === OPEN_TILE) {
    if (x>=0 && x < GRID_SIZE && y >= 0 && y<GRID_SIZE) {
      //change previous tile
      grid[player.y][player.x] = OPEN_TILE;
    
      //keep track of player location
      player.x = x;
      player.y = y;
    
      //put player in grid
      grid[player.y][player.x] = PLAYER_TILE;
    }
  }

}