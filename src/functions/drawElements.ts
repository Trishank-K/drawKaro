import { Line, shape } from "@/packages/types";
import { drawLine } from "./drawLine";

const drawElements = (
  element: shape[],
  canvas: HTMLCanvasElement,
  offX: number = 0,
  offY: number = 0
) => {
  if (canvas) {
    element.forEach((element) => {
      if (element.name === "line") {
        const { x1, x2, y1, y2, options } = element.properties as Line;
        drawLine(
          {
            x1: x1 - offX,
            y1: y1 - offY,
            x2: x2 - offX,
            y2: y2 - offY,
            options,
          },
          canvas
        );
      }
    });
  }
};

export { drawElements };
