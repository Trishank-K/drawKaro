const drawGrid = (
  canvas: HTMLCanvasElement | null,
  gridSize: number,
  offsetX: number = 0,
  offsetY: number = 0,
  color: string = "lightgrey"
) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.translate(-offsetX, -offsetY);

  ctx.strokeStyle = color;
  for (let x = 0; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
};

export { drawGrid };
