// Grid Based Assignment
// Jacob Koshman
// November ... 
//
// Extra for Experts:
// - used 3d arrays

const GRID_SIZE = 10; 
let boxSize = 20;
let squareSize; 
let grid = [];
let grid2 = [];
let changeDelay = 10; 
let state = "start";
let grid2dButton;
let grid3dButton;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  squareSize = height/GRID_SIZE;
  grid = createGrid();
  // grid2 = create2dGrid();
  // gridSwitch2d();
  // gridSwitch3d();
}

function draw() {
  background(255);
  orbitControl();
  fillGrid();
}

function stateStuff() {
  // if (state === "start") {
  //   // grid2dButton.show();
  //   // grid3dButton.show();
  // }
  // else if (state === "third dimension") {
  // orbitControl();
  // fillGrid();
  //   // grid2dButton.hide();
  //   // grid3dButton.hide();
  // }
  // else if (state === "second dimension") {
  //   display2dGrid();
  //   // grid2dButton.hide();
  //   // grid3dButton.hide();
  // }
}

// function gridSwitch2d() {
//   grid2dButton = createButton("click to start with a 2d grid");
//   grid2dButton.mousePressed(changeState());
//   grid2dButton.position(width/4, height/2);
// }

// function gridSwitch3d() {
//   grid3dButton = createButton("click to start with a 3d grid");
//   grid3dButton.mousePressed(changeState2());
//   grid3dButton.position(width*0.75, height/2);
// }

// function changeState() {
//   state = "second dimension";
// }

// function changeState2() {
//   state = "third dimension";
// }

function keyPressed() {
  if (key === "r" && state === "third dimension") {
    createGrid();
  }
//   else if (key === "r" && state === "second dimension") {
//     create2dGrid();
//   }
//   if (key === "e" && state === "second dimension") {
//     generateEmpty2dGrid();
//   }
}

// 3d grid functions

//create the grid
function createGrid() {
  for (let i=0; i<GRID_SIZE; i++) {
    grid[i] = [];
    for (let j=0; j<GRID_SIZE; j++) {
      grid[i][j] = [];
      for (let k=0; k<GRID_SIZE; k++) {        
        if (random(100) < 50) {
          grid[i][j][k] = 1;
        } 
        else {
          grid[i][j][k] = 0;
        }
      }
    }
  }
}


//fill the grid
function fillGrid() {
  if (state === "third dimension") {
    translate(-boxSize*GRID_SIZE/2 + boxSize/2, 
      -boxSize*GRID_SIZE/2 + boxSize/2, 
      -boxSize*GRID_SIZE/2 + boxSize/2);
    
    for (let i=0; i<GRID_SIZE; i++) {
      for (let j=0; j<GRID_SIZE; j++) {
        for (let k=0; k<GRID_SIZE; k++) {
          if (grid[i][j][k] === 1) {
            fill("black");
            stroke("blue");
          } 
          else if (grid[i][j][k] === 0){
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
    
    //changes the grid after a certain number of frames has passed
    if (frameCount % changeDelay === 0) {
      update();
    }
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
          if (neighbours === 2 || neighbours === 3) {
            nextGen[i][j][k] = 1;
          } 
          else {
            nextGen[i][j][k] = 0;
          }
        } 
        else if (grid[i][j][k] === 0) {
          if (neighbours === 3) {
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
        if (x+i >= 0 && x+i < GRID_SIZE && y+j >= 0 && y+j < GRID_SIZE && z+k >= 0 && z+k < GRID_SIZE) {
          sum += grid[x+i][y+j][z+k];         
        }
      }
    }
  }
  sum -= grid[x][y][z];
  return sum;
  
}

// //2d grid functions

// //create the grid
// function create2dGrid() {
//   state = "second dimension";
//   let new2dGrid = [];
//   for (let x = 0; x < GRID_SIZE; x++) {
//     new2dGrid.push([]);
//     for (let y = 0; y < GRID_SIZE; y++) {
//       if (random(100) > 50) {
//         new2dGrid[x][y] = 1;
//       }
//       else {
//         new2dGrid[x][y] = 0;
//       }
//     }
//   }
//   return new2dGrid;
// }


// //show the grid
// function display2dGrid() {
//   for (let x = 0; x < GRID_SIZE; x++) {
//     for (let y = 0; y < GRID_SIZE; y++) {
//       if (grid2[x][y] === 1) {
//         fill("black");
//       }
//       else {
//         fill("white");
//       }

//       square(x*squareSize, y*squareSize, squareSize);
//     }
//   }

//   if (frameCount % changeDelay === 0) {
//     nextTurn();
//   }
// }


// //update the grid
// function nextTurn() {
//   let nextTurn = [];

//   //look at every cell
//   for (let x = 0; x<GRID_SIZE; x++) {
//     for (let y = 0; x<GRID_SIZE; y++) {
//       let neighbours = neighbourCount(grid2, x, y);

//       //apply the rules of the game
//       if (grid2[x][y] === 0) {
//         //currently dead
//         if (neighbours === 3) {
//           nextTurn[x][y] = 1;
//         }
//         else {
//           nextTurn[x][y] = 0;
//         }
//       }

//       if (grid2[x][y] === 1) {
//         if (neighbours === 2 || neighbours === 3) {
//           nextTurn[x][y] = 1;
//         }
//         else {
//           nextTurn[x][y] = 0;
//         }
//       }

//     }
//   }
//   grid2 = nextTurn;
// }


// //create empty grid
// function generateEmpty2dGrid(cols, rows) {
//   let newGrid = [];
//   for (let x = 0; x<rows; x++) {
//     newGrid.push([]);
//     for (let y = 0; y<cols; y++) {
//       newGrid[x][y] = 0;
//     }
//   }
//   return newGrid;
// }


// //count and return the neighbours
// function neighbourCount(grid2, x, y) {
//   //count the neighbours
//   let neighbours = 0;

//   for(let i = -1; i<=1; i++) {
//     for (let j = -1;j<=1;j++) {
//       //dont make stupid
//       if (x+i>=0 && x+i<GRID_SIZE && y+j>=0 && y+j < GRID_SIZE) {
//         neighbours += grid2[x+i][y+j];
//       }
//     }
//   }

//   //dont count self
//   neighbours -= grid2[x][y];
//   return neighbours;

