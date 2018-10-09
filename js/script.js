// Functions
function circle(radius) {
  ctx.beginPath();
  ctx.arc(radius, radius, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function draw() {
  ctx.save();
  ctx.scale(ratio, ratio);

  // Begin draw
  circle(50);
  // End draw

  ctx.restore();
}

function update() {
  requestAnimationFrame(update);
}

function resizeHandler() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  canvas.width = windowWidth * ratio;
  canvas.height = windowHeight * ratio;
  draw();
}

// DOM elements
const canvas = document.querySelector('canvas');

// Variables
const ctx = canvas.getContext('2d');
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let ratio = window.devicePixelRatio || 1;

// Events
window.addEventListener('resize', resizeHandler);

// Body
draw();
requestAnimationFrame(update);
resizeHandler();
