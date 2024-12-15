import { FreeStyle, Line, Rectangle, shape } from "@/packages/types";
import { drawLine } from "./drawLine";
import { drawRectangle } from "./drawRectangle";
import { drawFreeStyle } from "./drawFreeStyle";

const drawElements = (
  element: shape[],
  canvas: HTMLCanvasElement,
  offX: number = 0,
  offY: number = 0
) => {
  if (canvas) {
    element.forEach((element) => {
      switch (element.name) {
        case "Line":
          {
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
          break;
        case "Rectangle": {
          const { x, y, width, height, options } =
            element.properties as Rectangle;
          drawRectangle(
            {
              x: x - offX,
              y: y - offY,
              width,
              height,
              options,
            },
            canvas
          );
        } break;
        case "FreeStyle": {
          const {points, options} = element.properties as FreeStyle;
          drawFreeStyle({points,options},canvas);
        }
      }
    });
  }
};

export { drawElements };
