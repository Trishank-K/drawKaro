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
import { Point } from "roughjs/bin/geometry";

function useDraw() {
  const prCanvas = useRecoilValue(previewCanvas);
  const finCanvas = useRecoilValue(finalCanvas);
  const selectedTool = useRecoilValue(toolState);
  const offX = useRecoilValue(offsetX);
  const offY = useRecoilValue(offsetY);
  const tool = useRecoilValue(toolState);

  const startDrawXRef = useRef(0);
  const startDrawYRef = useRef(0);
  const endDrawXRef = useRef(0);
  const endDrawYRef = useRef(0);
  const isDrawingRef = useRef(false);
  const shapeRef = useRef<shape | null>(null);
  const pointsRef = useRef<Point[] | null>(null);
  const [element, setElements] = useState<shape[]>([]);

  useEffect(() => {
    if (finCanvas) {
      finCanvas
        .getContext("2d")
        ?.clearRect(0, 0, finCanvas.width, finCanvas.height);
      drawElements(element, finCanvas, offX, offY);
    }
  }, [offX, offY, element, finCanvas]);

  useEffect(() => {
    if (!prCanvas || selectedTool === "Hand") return;

    const handleMouseDown = (e: MouseEvent) => {
      isDrawingRef.current = true;
      startDrawXRef.current = e.clientX + offX;
      startDrawYRef.current = e.clientY + offY;
      if (tool === "FreeStyle") {
        pointsRef.current = [[e.clientX + offX, e.clientY + offY]];
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDrawingRef.current && prCanvas) {
        endDrawXRef.current = e.clientX + offX;
        endDrawYRef.current = e.clientY + offY;
        prCanvas
          .getContext("2d")
          ?.clearRect(0, 0, prCanvas.width, prCanvas.height);
        if (tool === "Line") {
          shapeRef.current = {
            name: "Line",
            properties: {
              x1: startDrawXRef.current,
              y1: startDrawYRef.current,
              x2: e.clientX + offX,
              y2: e.clientY + offY,
            },
          } as shape;
        } else if (tool === "Rectangle") {
          shapeRef.current = {
            name: "Rectangle",
            properties: {
              x: startDrawXRef.current,
              y: startDrawYRef.current,
              width: e.clientX + offX - startDrawXRef.current,
              height: e.clientY + offY - startDrawYRef.current,
            },
          } as shape;
        } else if (tool === "FreeStyle") {
          if (pointsRef.current) {
            pointsRef.current.push([e.clientX + offX, e.clientY + offY]);
            shapeRef.current = {
              name: "FreeStyle",
              properties: {
                points: pointsRef.current,
              },
            };
          }
        }
        if (shapeRef.current) {
          drawElements([shapeRef.current], prCanvas, offX, offY);
        }
      }
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
      if (shapeRef.current) {
        setElements([...element, shapeRef.current]);
        shapeRef.current = null;
      }
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
  }, [prCanvas, selectedTool, offX, offY, element, tool]);

  return { element };
}

export { useDraw };
