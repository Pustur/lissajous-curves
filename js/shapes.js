const Shapes = function(ctx) {
  function circle(x, y, radius, options = {}) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);

    if (options.fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  function line(coordinate, value) {
    const currentStyle = ctx.strokeStyle;

    ctx.beginPath();

    if (coordinate === 'x') {
      ctx.moveTo(value, 0);
      ctx.lineTo(value, windowHeight * ratio);
    } else if (coordinate === 'y') {
      ctx.moveTo(0, value);
      ctx.lineTo(windowWidth * ratio, value);
    }

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.stroke();
    ctx.strokeStyle = currentStyle;
  }

  return {
    circle,
    line,
  };
};
