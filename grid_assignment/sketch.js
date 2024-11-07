// Grid Based Assignment
// Jacob Koshman
// November ... 
//
// Extra for Experts:
// - used 3d arrays

const GRID_SIZE = 10; 
const DEAD = 0;
const ALIVE = 1;
let boxSize = 20;
let squareSize = 25; 
let grid;
let grid2;
let state;
let changeDelay = 10; 
let grid2dButton;
let grid3dButton;
let maxNeighbour = 3;
let minNeighbour = 2;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  gridSwitch2d();
  gridSwitch3d();
  state = "start";
}

function draw() {
  background(255);
  stateStuff();
}

function stateStuff() {
  if (state === "start") {
    grid2dButton.show();
    grid3dButton.show();
  }
  else if (state === "third dimension") {
    orbitControl();
    fillGrid();
    grid2dButton.hide();
    grid3dButton.hide();
  }
  else if (state === "second dimension") {
    display2dGrid();
    grid2dButton.hide();
    grid3dButton.hide();
  }
}

function gridSwitch2d() {
  grid2dButton = createButton("click to start with a 2d grid");
  grid2dButton.mouseOver();
  // grid2dButton.size(150, 21);
  // grid2dButton.style("font-size", "10px");
  grid2dButton.mousePressed(changeState);
  grid2dButton.position(width/2 - 100, height/2);
}

function gridSwitch3d() {
  grid3dButton = createButton("click to start with a 3d grid");
  grid3dButton.mousePressed(changeState2);
  grid3dButton.position(width/2 + 100, height/2);
}

function changeState() {
  state = "second dimension";
  grid2 = create2dGrid();
}

function changeState2() {
  state = "third dimension";
  grid = createGrid();
}

function keyPressed() {
  if (key === "r" && state === "third dimension") {
    grid = createGrid();
  }
  else if (key === "r" && state === "second dimension") {
    grid2 = create2dGrid();
  }
  if (key === "e" && state === "second dimension") {
    grid2 = generateEmpty2dGrid();
  }
  else if (key === "e" && state === "third dimension") {
    grid = createEmptyGrid();
  }
}

// 3d grid functions

//create the grid
function createGrid() {
  let createdGrid = [];
  for (let x=0; x<GRID_SIZE; x++) {
    createdGrid[x] = [];
    for (let y=0; y<GRID_SIZE; y++) {
      createdGrid[x][y] = [];
      for (let z=0; z<GRID_SIZE; z++) {        
        if (random(100) < 50) {
          createdGrid[x][y][z] = ALIVE;
        } 
        else {
          createdGrid[x][y][z] = DEAD;
        }
      }
    }
  }
  return createdGrid;
}

function createEmptyGrid() {
  let createdGrid = [];
  for (let x=0; x<GRID_SIZE; x++) {
    createdGrid[x] = [];
    for (let y=0; y<GRID_SIZE; y++) {
      createdGrid[x][y] = [];
      for (let z=0; z<GRID_SIZE; z++) {        
        createdGrid[x][y][z] = DEAD;
      }
    }
  }
  return createdGrid;
}

//fill the grid
function fillGrid() {
  //center the cubes
  translate(-boxSize*GRID_SIZE/2 + boxSize/2, 
    -boxSize*GRID_SIZE/2 + boxSize/2, 
    -boxSize*GRID_SIZE/2 + boxSize/2);
    
  for (let i=0; i<GRID_SIZE; i++) {
    for (let j=0; j<GRID_SIZE; j++) {
      for (let k=0; k<GRID_SIZE; k++) {
        if (grid[i][j][k] === ALIVE) {
          fill("lightblue");
          strokeWeight(0.5);
          noStroke();
        } 
        
        else if (grid[i][j][k] === DEAD) {
          noFill();
          strokeWeight(0.5);
          stroke("gray"); 
        }
          
        push();
        translate(i*boxSize, j*boxSize, k*boxSize);
        box(boxSize);
        pop();
      }
    }
  }
    
  //changes the grid after a certain number of frames has passed
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
   
        let neighbours = neighboringStates(grid, i, j, k);

        if (grid[i][j][k] === 1) {
          if (neighbours === minNeighbour || neighbours === maxNeighbour) {
            nextGen[i][j][k] = ALIVE;
          } 
          else {
            nextGen[i][j][k] = DEAD;
          }
        } 
        else if (grid[i][j][k] === DEAD) {
          if (neighbours === maxNeighbour) {
            nextGen[i][j][k] = ALIVE;
          } 
          else {
            nextGen[i][j][k] = DEAD;
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
        if (x+i >= 0 && x+i < GRID_SIZE && y+j >= 0 && y+j < GRID_SIZE && z+k >= 0 && z+k < GRID_SIZE) {
          sum += grid[x+i][y+j][z+k];         
        }
      }
    }
  }
  sum -= grid[x][y][z];
  return sum;
  
}

//2d grid functions

//create the grid
function create2dGrid() {
  let newGrid = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    newGrid[x] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      //determine the color of the box using a random number
      if (random(100) > 50) {
        newGrid[x][y] = ALIVE;
      }
      else {
        newGrid[x][y] = DEAD;
      }
    }
  }
  return newGrid;
}


//show the grid
function display2dGrid() {
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      if (grid2[x][y] === ALIVE) {
        fill("black");
      }
      else if(grid2[x][y] === DEAD) {
        fill("white");
      }

      square(x*squareSize, y*squareSize, squareSize);
    }
  }

  if (frameCount % changeDelay === 0) {
    grid2 = updateGrid();
  }
}

//update the grid for the next turn
function updateGrid() {
  //make a new array to hold the next turn
  let nextTurn = generateEmpty2dGrid();

  //look at every cell
  for (let x = 0; x<GRID_SIZE; x++) {
    for (let y = 0; y<GRID_SIZE; y++) {
      //count the neighbours
      let neighbours = 0;

      for(let i = -1; i<=1; i++) {
        for (let j = -1;j<=1;j++) {
          //dont make stupid
          if (x+i>=0 && x+i<GRID_SIZE && y+j>=0 && y+j < GRID_SIZE) {
            neighbours += grid2[x+i][y+j];
          }
        }
      }

      //dont count self
      neighbours -= grid2[x][y];

      //apply the rules of the game
      if (grid2[x][y] === DEAD) {
        //currently dead
        if (neighbours === maxNeighbour) {
          nextTurn[x][y] = ALIVE;
        }
        else {
          nextTurn[x][y] = DEAD;
        }
      }

      if (grid2[x][y] === ALIVE) {
        if (neighbours === minNeighbour || neighbours === maxNeighbour) {
          nextTurn[x][y] = ALIVE;
        }
        else {
          nextTurn[x][y] = DEAD;
        }
      }

    }
  }
  return nextTurn;
}


//create empty grid
function generateEmpty2dGrid() {
  let newGrid = [];
  for (let x = 0; x<GRID_SIZE; x++) {
    newGrid[x] = [];
    for (let y = 0; y<GRID_SIZE; y++) {
      newGrid[x][y] = DEAD;
    }
  }
  return newGrid;
}


//count and return the neighbours
function neighbourCount(grid, x, y) {
  //count the neighbours
  let neighbours = 0;

  for(let i = -1; i<=1; i++) {
    for (let j = -1;j<=1;j++) {
      //dont make stupid
      if (x+i>=0 && x+i<GRID_SIZE && y+j>=0 && y+j < GRID_SIZE) {
        neighbours += grid[x+i][y+j];
      }
    }
  }

  //dont count self
  neighbours -= grid[x][y];
  return neighbours;
}
