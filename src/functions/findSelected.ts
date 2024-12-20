import { Line, shape } from "@/packages/types";
import { selectLine } from "./selectLine";

const findSelected = (elements: shape[],x:number,y:number) => {
    for(let i = 0;i<elements.length;i++)    {
        if(elements[i].name === "Line") {
            const line = elements[i].properties as Line;
            if( selectLine(line,x,y))
                return elements[i];
        }
    }
    return null;
}

export {findSelected};