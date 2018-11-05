class Trail {
  constructor(maxPoints = 375) {
    this.points = [];
    this.maxPoints = maxPoints;
  }

  push(point) {
    if (this.points.length >= this.maxPoints) {
      this.points.shift();
    }

    return this.points.push(point);
  }

  draw(ctx) {
    ctx.beginPath();

    this.points.forEach((point, i, points) => {
      const prevPoint = points[i - 1] || point;

      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
    });

    ctx.stroke();
  }
}
