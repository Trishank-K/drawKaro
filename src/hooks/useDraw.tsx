import {
  finalCanvas,
  offsetX,
  offsetY,
  previewCanvas,
  toolState,
} from "@/atoms/canvasAtoms";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import rough from "roughjs";

interface shape {
  name: string;
  properties: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    options: {
      strokeWidth: number;
      stroke: string;
    };
  };
}

function useDraw() {
  const [prCanvas, setPrCanvas] = useRecoilState(previewCanvas);
  const [finCavas, setFinCanvas] = useRecoilState(finalCanvas);
  const selectedTool = useRecoilValue(toolState);
  const offX = useRecoilValue(offsetX);
  const offY = useRecoilValue(offsetY);
  let startDrawX = 0;
  let startDrawY = 0;
  let endDrawX = 0;
  let endDrawY = 0;
  let isDrawing = false;
  const [element, setElements] = useState<shape[]>([]);

  const reDrawElements = () => {
    console.log("REDRAW CALLED");
    if (finCavas) {
      console.log("REDRAWING: ",element);
      let rc = rough.canvas(finCavas);
      let ctx = finCavas.getContext("2d");
      ctx?.clearRect(0, 0, finCavas.width, finCavas.height);
      ctx?.save();
      let generator = rc.generator;
      element.forEach((l) => {
        let line = generator.line(
          l.properties.x1 - offX,
          l.properties.y1 - offY,
          l.properties.x2 - offX,
          l.properties.y2 - offY,
          l.properties.options
        );
        rc.draw(line);
        ctx?.restore();
      });
    }
  }

  const drawLine = (x1:number,y1:number,x2:number,y2:number)=>{
    if(prCanvas)  {
      let rc = rough.canvas(prCanvas);
      let ctx = prCanvas.getContext("2d");
      let generator = rc.generator;
      let line = generator.line(x1,y1,x2,y2,{strokeWidth:4, stroke:"white"});
      rc.draw(line);
    }
  }
  useEffect(reDrawElements,[offX,offY,element]);

  useEffect(() => {
    if (!prCanvas || selectedTool !== 7) return;
    const handleMouseDown = (e: MouseEvent) => {
      isDrawing = true;
      startDrawX = (e.clientX + offX);
      startDrawY = (e.clientY + offY);
      console.log("HEHE")
    };

    const handleMouseMove = (e: MouseEvent) => {
      if(isDrawing && prCanvas)  {
        console.log("HEHE2")
        endDrawX = (e.clientX + offX);
        endDrawY = (e.clientY + offY);
        prCanvas.getContext("2d")?.clearRect(0,0,prCanvas.width,prCanvas.height);
        drawLine(startDrawX,startDrawY,e.clientX+offX,e.clientY+offY);
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      console.log("HEHE3")
      isDrawing = false;
      const el : shape = {
        name:"line",
        properties:{
          x1:startDrawX,
          y1:startDrawY,
          x2:endDrawX,
          y2:endDrawY,
          options:{
            strokeWidth: 5,
            stroke: "white"
          }
        }
      }
      console.log("Element: ",element);
      setElements((element)=>{ return [...element,el]})
      prCanvas.getContext("2d")?.clearRect(0,0,prCanvas.width,prCanvas.height);
    };

    prCanvas.addEventListener("mousemove", handleMouseMove);
    prCanvas.addEventListener("mousedown", handleMouseDown);
    prCanvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      prCanvas.removeEventListener("mousemove", handleMouseMove);
      prCanvas.removeEventListener("mousedown", handleMouseDown);
      prCanvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [prCanvas, selectedTool, startDrawX, startDrawY, isDrawing, offX, offY]);

}

export { useDraw };
