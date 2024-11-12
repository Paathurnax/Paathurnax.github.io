// Grid Based Assignment
// Jacob Koshman
// November ... 
//
// Extra for Experts:
// - used 3d arrays and centered the canvas using javascript


//initializing the constants and the variables
const GRID_SIZE = 10; 
const DEAD = 0;
const ALIVE = 1;
let boxSize = 20;
let squareSize; 
let grid;
let grid2;
let state;
let changeDelay = 10; 
let grid2dButton;
let grid3dButton;
let maxNeighbour = 3;
let minNeighbour = 2;
let canvas;
let font;


//loading the text font
function preload() {
  font = loadFont("Inconsolata.otf");
}


//creating the canvas and centering it
function setup() {
  if (windowWidth < windowHeight) {
    canvas = createCanvas(windowWidth, windowWidth/2, WEBGL);
    canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  }
  else {
    canvas = createCanvas(windowHeight, windowHeight/2, WEBGL);
    canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  }
  //changing the square size to fit the canvas height
  squareSize = height/GRID_SIZE;

  //creating the buttons
  gridSwitch2d();
  gridSwitch3d();

  //the first state
  state = "start";
}

//coloring the background and running the state function
function draw() {
  background(25);
  stateStuff();
}

function stateStuff() {
  //start screen
  if (state === "start") {
    textFont(font);
    fill("blue");
    text("The Game of Life 2D and 3D", width/2, -150);
    grid2dButton.show();
    grid3dButton.show();
  }

  //3d grid state
  else if (state === "third dimension") {
    orbitControl();
    fillGrid();
    grid2dButton.hide();
    grid3dButton.hide();
  }

  //2d grid state
  else if (state === "second dimension") {
    fillGrid();
    grid2dButton.hide();
    grid3dButton.hide();
  }
}

//2d grid button creation
function gridSwitch2d() {
  grid2dButton = createButton("click to start with a 2d grid");
  grid2dButton.doubleClicked(changeState);
  grid2dButton.position(width*0.75, height);
  grid2dButton.draggable();
}

//3d grid button creation
function gridSwitch3d() {
  grid3dButton = createButton("click to start with a 3d grid");
  grid3dButton.doubleClicked(changeState2);
  grid3dButton.position(width, height);
  grid3dButton.draggable();
}


//functions for each button to run when they are pressed
function changeState() {
  state = "second dimension";
  grid2 = createGrid();
}

function changeState2() {
  state = "third dimension";
  grid = createGrid();
}


//creating random or empty grids depending on the key pressed and the current state
function keyPressed() {
  if (key === "r") {
    if (state === "third dimension") {
      grid = createGrid();
    }
    else if (state === "second dimension") {
      grid2 = createGrid();
    }
  }

  if (key === "e") {
    if (state === "third dimension") {
      grid = createEmptyGrid();
    }
    else if (state === "second dimension") {
      grid2 = createEmptyGrid();
    }
  }
}

//grid functions

function createGrid() {
  //initializing the grid
  let createdGrid = [];

  //creating the 3d grid
  if (state === "third dimension") {
    for (let x=0; x<GRID_SIZE; x++) {
      createdGrid[x] = [];
      for (let y=0; y<GRID_SIZE; y++) {
        createdGrid[x][y] = [];
        for (let z=0; z<GRID_SIZE; z++) {   
          
          //determining the boxes color with a random number
          if (random(100) < 50) {
            createdGrid[x][y][z] = ALIVE;
          } 
          else {
            createdGrid[x][y][z] = DEAD;
          }
        }
      }
    }
  }

  //creating the 2d grid
  else if (state === "second dimension") {
    for (let x = 0; x < GRID_SIZE; x++) {
      createdGrid[x] = [];
      for (let y = 0; y < GRID_SIZE; y++) {
        //determine the color of the square using a random number
        if (random(100) > 50) {
          createdGrid[x][y] = ALIVE;
        }
        else {
          createdGrid[x][y] = DEAD;
        }
      }
    }
  }
  //returning the grid created
  return createdGrid;
}

function createEmptyGrid() {
  //initializing the grid
  let createdGrid = [];

  //creating an empty 3d grid
  if (state === "third dimension") {
    for (let x=0; x<GRID_SIZE; x++) {
      createdGrid[x] = [];
      for (let y=0; y<GRID_SIZE; y++) {
        createdGrid[x][y] = [];
        for (let z=0; z<GRID_SIZE; z++) {        
          createdGrid[x][y][z] = DEAD;
        }
      }
    }
  }

  //creating an empty 2d grid
  else if (state === "second dimension") {
    for (let x = 0; x<GRID_SIZE; x++) {
      createdGrid[x] = [];
      for (let y = 0; y<GRID_SIZE; y++) {
        createdGrid[x][y] = DEAD;
      }
    }
  }

  //returning the empty grid
  return createdGrid;
}

function fillGrid() {
  //display the 3d grid
  if (state === "third dimension") {
    //center the boxes
    translate(-boxSize*GRID_SIZE/2 + boxSize/2, 
      -boxSize*GRID_SIZE/2 + boxSize/2, 
      -boxSize*GRID_SIZE/2 + boxSize/2);
      
    for (let i=0; i<GRID_SIZE; i++) {
      for (let j=0; j<GRID_SIZE; j++) {
        for (let k=0; k<GRID_SIZE; k++) {

          //change the color
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
           
          //place the boxes in the proper location
          push();
          translate(i*boxSize, j*boxSize, k*boxSize);
          box(boxSize);
          pop();
        }
      }
    }
      
    //changes the grid after a certain number of frames has passed
    if (frameCount % changeDelay === 0) {
      grid = update();
    }
  }
  
  //displaying the 2d grid
  else if (state === "second dimension") {
    //moving the grid to the proper location
    translate(-squareSize*GRID_SIZE/2, -squareSize*GRID_SIZE/2, 0);
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        //filling the grid with the right color
        if (grid2[x][y] === ALIVE) {
          fill("lightblue");
        }
        else if(grid2[x][y] === DEAD) {
          fill("gray");
        }
        //placing the squares
        square(x*squareSize, y*squareSize, squareSize);
      }
    }
    //update the grid after a delay
    if (frameCount % changeDelay === 0) {
      grid2 = update();
    }
  }
}


//changes the grid
function update() {
  //inializing the new grid
  let nextGen = [];

  //updating the 3d grid
  if (state === "third dimension") {
    for (let i=0; i<GRID_SIZE; i++) {
      nextGen[i] = [];
      for (let j=0; j<GRID_SIZE; j++) {
        nextGen[i][j] = [];
        for (let k=0; k<GRID_SIZE; k++) {
          //find the number of neighbours
          let neighbours = neighboringStates(grid, i, j, k);
  
          //apply the rules
          if (grid[i][j][k] === ALIVE) {
            //currently alive
            if (neighbours === minNeighbour || neighbours === maxNeighbour) {
              nextGen[i][j][k] = ALIVE;
            } 
            else {
              nextGen[i][j][k] = DEAD;
            }
          } 

          else if (grid[i][j][k] === DEAD) {
            //currently dead
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
  }

  else if (state === "second dimension") {
    //start off with an empty grid
    nextGen = createEmptyGrid();
    for (let i = 0; i<GRID_SIZE; i++) {
      for (let j = 0; j<GRID_SIZE; j++) {
        //count the neighbours
        let neighbours = neighbourCount(grid2, i, j);

        //apply the rules of the game
        if (grid2[i][j] === DEAD) {
          //currently dead
          if (neighbours === maxNeighbour) {
            nextGen[i][j] = ALIVE;
          }
          else {
            nextGen[i][j] = DEAD;
          }
        }

        if (grid2[i][j] === ALIVE) {
          //currently alive
          if (neighbours === minNeighbour || neighbours === maxNeighbour) {
            nextGen[i][j] = ALIVE;
          }
          else {
            nextGen[i][j] = DEAD;
          }
        }
      }
    }
  }

  //return the newly made grid
  return nextGen;
}


//finds and adds together the neighbouring boxes
function neighboringStates(grid, x, y, z) {
  //count the neighbours
  let neighbours = 0;

  for (let i=-1; i<1; i++) {
    for (let j=-1; j<1; j++) {
      for (let k=-1; k<1; k++) {
        //check to make sure that no undefined error will be thrown
        if (x+i >= 0 && x+i < GRID_SIZE && y+j >= 0 && y+j < GRID_SIZE && z+k >= 0 && z+k < GRID_SIZE) {
          neighbours += grid[x+i][y+j][z+k];         
        }
      }
    }
  }

  //dont count self
  neighbours -= grid[x][y][z];
  return neighbours;
  
}


//count and return the neighbours
function neighbourCount(grid, x, y) {
  //count the neighbours
  let neighbours = 0;

  for(let i = -1; i<=1; i++) {
    for (let j = -1;j<=1;j++) {
      //checking if the neighbour actually exists
      if (x+i>=0 && x+i<GRID_SIZE && y+j>=0 && y+j < GRID_SIZE) {
        neighbours += grid[x+i][y+j];
      }
    }
  }

  //dont count self
  neighbours -= grid[x][y];
  return neighbours;
}
