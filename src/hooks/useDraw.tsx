import {
  isDragging,
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
  const selectedTool = useRecoilValue(toolState);
  const offX = useRecoilValue(offsetX);
  const offY = useRecoilValue(offsetY);
  const [startDrawX, setStartDrawX] = useState(0);
  const [startDrawY, setStartDrawY] = useState(0);
  const [endDrawX, setEndDrawX] = useState(0);
  const [endDrawY, setEndDrawY] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [element, setElements] = useState<shape[]>([]);

  const reDrawElements = () => {
    if (prCanvas) {
      let rc = rough.canvas(prCanvas);
      let ctx = prCanvas.getContext("2d");
      ctx?.clearRect(0, 0, prCanvas.width, prCanvas.height);
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
      let rc = rough.canvas(prCanvas)
      let ctx = prCanvas.getContext("2d");
      let generator = rc.generator;
      let line = generator.line(x1,y1,x2,y2,{strokeWidth:4, stroke:"white"});
      rc.draw(line);
    }
  }
  useEffect(reDrawElements,[offX,offY,prCanvas]);

  useEffect(() => {
    if (!prCanvas || selectedTool !== 7) return;
    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      setStartDrawX(e.clientX + offX);
      setStartDrawY(e.clientY + offY);
      console.log("HEHE")
    };
    const handleMouseMove = (e: MouseEvent) => {
      if(isDrawing)  {
        console.log("HEHE2")
        setEndDrawX(e.clientX + offX);
        setEndDrawY(e.clientY + offY);
        reDrawElements();
        drawLine(startDrawX,startDrawY,endDrawX,endDrawY);
      }
    };
    const handleMouseUp = (e: MouseEvent) => {
      console.log("HEHE3")
      setIsDrawing(false);
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
      setElements((element)=>[...element,el])
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

  useEffect(() => {
    const initialLine: shape = {
      name: "line",
      properties: {
        x1: 60,
        y1: 60,
        x2: 190,
        y2: 60,
        options: {
          strokeWidth: 5,
          stroke: "white",
        },
      },
    };
    setElements([initialLine]);
  }, []);
}

export { useDraw };
