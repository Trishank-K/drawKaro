const drawGrid = (
  canvas: HTMLCanvasElement | null,
  gridSize: number = 50,
  offsetX: number = 0,
  offsetY: number = 0,
  color: string = "lightgrey"
) => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = color;

  const startX = -offsetX % gridSize;
  const startY = -offsetY % gridSize;

  for (let x = startX; x <= width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = startY; y <= height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
};

export { drawGrid };
