import { Line } from "@/packages/types";
import distance from "euclidean-distance";
const selectLine = (line: Line, x: number, y: number) => {
  console.log(x, y);
  if (
    Math.abs(
      distance([x, y], [line.x1, line.y1]) +
        distance([x, y], [line.x2, line.y2]) -
        distance([line.x2, line.y2], [line.x1, line.y1])
    ) <= 2
  ) {
    return true;
  }
  return false;
};
export { selectLine };
