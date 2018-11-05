// Functions
function draw() {
  ctx.save();
  ctx.scale(ratio, ratio);

  // Begin draw
  const bigRadius = 50;
  const smallRadius = 2;
  const startIndex = 1;
  const points = { columns: [], rows: [] };

  // Draw the columns
  for (let i = startIndex; i < count + startIndex; i++) {
    const x = bigRadius * i * 2 + bigRadius;
    const y = bigRadius;
    const t = time * i;
    const smallX = Math.sin(t) * bigRadius + x;
    const smallY = -Math.cos(t) * bigRadius + y;

    points.columns.push({ x, y });

    shapes.circle(x, y, bigRadius);
    shapes.circle(smallX, smallY, smallRadius, { fill: true });
    shapes.line('x', smallX);
  }

  // Draw the rows
  for (let i = startIndex; i < count + startIndex; i++) {
    const x = bigRadius;
    const y = bigRadius * i * 2 + bigRadius;
    const t = time * i;
    const smallX = Math.sin(t) * bigRadius + x;
    const smallY = -Math.cos(t) * bigRadius + y;

    points.rows.push({ x, y });

    shapes.circle(x, y, bigRadius);
    shapes.circle(smallX, smallY, smallRadius, { fill: true });
    shapes.line('y', smallY);
  }

  // Draw the grid
  points.rows.forEach((row, y) => {
    const ty = time * (y + startIndex);

    points.columns.forEach((col, x) => {
      const tx = time * (x + startIndex);
      const pointX = Math.sin(tx) * bigRadius + col.x;
      const pointY = -Math.cos(ty) * bigRadius + row.y;
      const trail = trails[y * points.rows.length + x];

      shapes.circle(pointX, pointY, smallRadius, { fill: true });
      trail.push({ x: pointX, y: pointY });
      trail.draw(ctx);
    });
  });
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
const count = 6;
const trails = Array.from({ length: Math.pow(count, 2) }, () => new Trail());
let time = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let ratio = window.devicePixelRatio || 1;

// Events
window.addEventListener('resize', resizeHandler);

// Body
update();
resizeHandler();
