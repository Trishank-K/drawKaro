import rough from "roughjs";
import { Line } from "@/packages/types";

function drawLine(
  { x1, y1, x2, y2, options = { strokeWidth: 5, stroke: "white" } }: Line,
  canvas: HTMLCanvasElement
) {
  if (canvas) {
    const rc = rough.canvas(canvas);
    const generator = rc.generator;
    const line = generator.line(x1, y1, x2, y2, options);
    rc.draw(line);
  }
}

export { drawLine };
