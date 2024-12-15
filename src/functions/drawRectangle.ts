import rough from "roughjs"
import { Rectangle } from "@/packages/types"
function drawRectangle({x,y,width,height,options={stroke:"white", strokeWidth:5,}}:Rectangle, canvas:HTMLCanvasElement)    {
    if(canvas)  {
        const rc = rough.canvas(canvas);
        const generator = rc.generator;
        const rectangle = generator.rectangle(x,y,width,height,options);
        rc.draw(rectangle);
    }
}
export {drawRectangle}