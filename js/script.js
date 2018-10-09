// Functions
function draw() {
  ctx.save();
  ctx.scale(ratio, ratio);

  // Begin draw
  const bigRadius = 50;
  const smallRadius = 3;
  const count = 6;
  const startIndex = 1;

  for (let i = startIndex; i < count + startIndex; i++) {
    const x = bigRadius * i * 2 + bigRadius;
    const y = bigRadius;
    const t = time * i;

    shapes.circle(x, y, bigRadius);
    shapes.circle(
      Math.sin(t) * bigRadius + x,
      -Math.cos(t) * bigRadius + y,
      smallRadius,
      { fill: true },
    );
    shapes.line('x', Math.sin(t) * bigRadius + x);
  }

  for (let i = startIndex; i < count + startIndex; i++) {
    const x = bigRadius;
    const y = bigRadius * i * 2 + bigRadius;
    const t = time * i;

    shapes.circle(x, y, bigRadius);
    shapes.circle(
      Math.sin(t) * bigRadius + x,
      -Math.cos(t) * bigRadius + y,
      smallRadius,
      { fill: true },
    );
    shapes.line('y', -Math.cos(t) * bigRadius + y);
  }
  // End draw

  ctx.restore();
}

function update() {
  time = (Date.now() - startTime) / 1000;
  ctx.clearRect(0, 0, windowWidth * ratio, windowHeight * ratio);
  draw();
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
const shapes = Shapes(ctx);
const startTime = Date.now();
let time = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let ratio = window.devicePixelRatio || 1;

// Events
window.addEventListener('resize', resizeHandler);

// Body
draw();
requestAnimationFrame(update);
resizeHandler();
