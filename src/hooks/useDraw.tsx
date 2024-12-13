import {
  finalCanvas,
  offsetX,
  offsetY,
  previewCanvas,
  toolState,
} from "@/atoms/canvasAtoms";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { shape } from "@/packages/types";
import { drawElements } from "@/functions/drawElements";
import { drawLine } from "@/functions/drawLine";

function useDraw() {
  const prCanvas = useRecoilValue(previewCanvas);
  const finCanvas = useRecoilValue(finalCanvas);
  const selectedTool = useRecoilValue(toolState);
  const offX = useRecoilValue(offsetX);
  const offY = useRecoilValue(offsetY);

  const startDrawXRef = useRef(0);
  const startDrawYRef = useRef(0);
  const endDrawXRef = useRef(0);
  const endDrawYRef = useRef(0);
  const isDrawingRef = useRef(false);

  const [element, setElements] = useState<shape[]>([]);

  useEffect(() => {
    if (finCanvas) {
      console.log("FIN CANVAS DRAW");
      finCanvas
        .getContext("2d")
        ?.clearRect(0, 0, finCanvas.width, finCanvas.height);
      drawElements(element, finCanvas, offX, offY);
    }
  }, [offX, offY, element, finCanvas]);

  useEffect(() => {
    if (!prCanvas || selectedTool !== 7) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      startDrawXRef.current = e.clientX + offX;
      startDrawYRef.current = e.clientY + offY;
      console.log("HEHE");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawingRef.current && prCanvas) {
        console.log("HEHE2");
        endDrawXRef.current = e.clientX + offX;
        endDrawYRef.current = e.clientY + offY;
        prCanvas
          .getContext("2d")
          ?.clearRect(0, 0, prCanvas.width, prCanvas.height);
        drawLine(
          {
            x1: startDrawXRef.current - offX,
            y1: startDrawYRef.current - offY,
            x2: e.clientX,
            y2: e.clientY,
          },
          prCanvas
        );
      }
    };

    const handleMouseUp = () => {
      console.log("HEHE3");
      isDrawingRef.current = false;
      const el: shape = {
        name: "line",
        properties: {
          x1: startDrawXRef.current,
          y1: startDrawYRef.current,
          x2: endDrawXRef.current,
          y2: endDrawYRef.current,
          options: {
            strokeWidth: 5,
            stroke: "white",
          },
        },
      };
      setElements((prevElements) => [...prevElements, el]);
      prCanvas
        .getContext("2d")
        ?.clearRect(0, 0, prCanvas.width, prCanvas.height);
    };

    prCanvas.addEventListener("mousemove", handleMouseMove);
    prCanvas.addEventListener("mousedown", handleMouseDown);
    prCanvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      prCanvas.removeEventListener("mousemove", handleMouseMove);
      prCanvas.removeEventListener("mousedown", handleMouseDown);
      prCanvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [prCanvas, selectedTool, offX, offY]);

  return { element };
}

export { useDraw };
