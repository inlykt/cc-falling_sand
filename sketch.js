// unclean global vars
let grid;
let w = 8;
let cols, rows;
let backgroundColor = 'white';
let hueValue = 1;


// unclean setup: sets up
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 255, 255)
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows)
}


// unclean builds the 2d canvas
function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}


// triggered on mouse dragged; creates the static sand
function mouseDragged() {
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);

  let matrix = 6;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.4) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }
}


// checks if the supplied column is within the canvas 
function withinCols(i) {
  return i >= 0 && i <= cols - 1;
}


// checks if the supplied column is within the canvas 
function withinRows(j) {
  return j >= 0 && j <= rows -1
}


// unclean do
function draw() {
  background(backgroundColor);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w)
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {
        let below = grid[i][j + 1];
        
        let dir = random([-1, 1])

        let belowA, belowB

        if (withinCols(i + dir)){
          belowA = grid[i + dir][j + 1]
        }
        if (withinCols(i - dir)){
          belowB = grid[i - dir][j + 1]
        }

        if (below === 0) {
          nextGrid[i][j + 1] = grid[i][j];
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = grid[i][j];
        } else if (belowB === 0) {
          nextGrid[i - dir][j + 1] = grid[i][j];
        } else {
          nextGrid[i][j] = grid[i][j];
        }
      }
    }
  }
  grid = nextGrid;
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1
  }
}