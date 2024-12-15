import { FreeStyle } from "@/packages/types";
import rough from "roughjs"
function drawFreeStyle({points, options={stroke:"white",strokeWidth:5}}: FreeStyle, canvas: HTMLCanvasElement)   {
    if(!canvas)
        return;
    const rc = rough.canvas(canvas);
    rc.curve(points,options);
}
export {drawFreeStyle};