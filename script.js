// Constants
const SKETCH_HEIGHT = 900;
const SKETCH_WIDTH = 960;

// Flags
let isDrag = false;
let isErase = false;

// Selectors
const sizeLabel = document.querySelector("#size");
const sizeInput = document.querySelector("#grid-size");
const gridContainer = document.querySelector(".container");
const createGridButton = document.querySelector(".create-grid");
const eraseButton = document.querySelector(".erase");
const clearGridButton = document.querySelector(".clear-grid");

// Initial Values
sizeLabel.textContent = sizeInput.value;

// Event Listeners
sizeInput.addEventListener("change", function (e) {
  sizeLabel.textContent = sizeInput.value;
});

createGridButton.addEventListener("click", function () {
  createGrid(sizeInput.value);
});

// Helpers
function randomColors() {
  const red = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);

  return [red, blue, green];
}

function initialSetup() {
  enableButton(createGridButton);
  enableSizeInput(sizeInput);

  disableButton(eraseButton);
  disableButton(clearGridButton);

  gridContainer.textContent = "";
}

function setupGridEventListeners() {
  gridContainer.addEventListener("mousedown", startDrag);
  gridContainer.addEventListener("mouseup", stopDrag);

  eraseButton.addEventListener("click", function (e) {
    if (e.target.textContent === "Erase") {
      isErase = true;
      e.target.textContent = "Stop Erase";
    } else {
      isErase = false;
      e.target.textContent = "Erase";
    }
  });

  clearGridButton.addEventListener("click", function () {
    initialSetup();
  });
}

function disableSizeInput(input) {
  input.disabled = true;
}

function enableSizeInput(input) {
  input.disabled = false;
}

function disableButton(button) {
  button.disabled = true;
}

function enableButton(button) {
  button.disabled = false;
}

function startDrag() {
  isDrag = true;
}

function stopDrag() {
  isDrag = false;
}

function colorOnMove(e) {
  const color = isErase ? [255, 255, 255] : randomColors();
  e.target.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

// Creating elements for grid
function createGridElement(height, width) {
  const gridHeight = height + "px";
  const gridWidth = width + "px";

  const gridElement = document.createElement("div");
  gridElement.setAttribute("id", "grid-element");

  gridElement.style.height = gridHeight;
  gridElement.style.width = gridWidth;

  return gridElement;
}

function createGridRow(size, height, width) {
  const gridRow = document.createElement("div");
  gridRow.setAttribute("id", "grid-row");

  for (let i = 0; i < size; i++) {
    gridRow.appendChild(createGridElement(height, width));
  }

  return gridRow;
}

function createGrid(size) {
  const cellHeight = SKETCH_HEIGHT / size;
  const cellWidth = SKETCH_WIDTH / size;

  for (let i = 0; i < size; i++) {
    gridContainer.appendChild(createGridRow(size, cellHeight, cellWidth));
  }

  disableButton(createGridButton);
  disableSizeInput(sizeInput);
  enableButton(eraseButton);
  enableButton(clearGridButton);

  const gridElements = document.querySelectorAll("#grid-element");
  for (const element of gridElements) {
    element.addEventListener("mousemove", function (e) {
      if (isDrag) {
        colorOnMove(e);
      }
    });
  }

  setupGridEventListeners();
}

// Initial Setup
initialSetup();
