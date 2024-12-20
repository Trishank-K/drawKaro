import {
    elements,
    offsetX,
    offsetY,
    previewCanvas,
    toolState,
  } from "@/atoms/canvasAtoms";
  import { drawElements } from "@/functions/drawElements";
  import { findSelected } from "@/functions/findSelected";
  import { Line, shape } from "@/packages/types";
  import { useEffect, useRef } from "react";
  import { useRecoilState, useRecoilValue } from "recoil";
  
  const useMove = () => {
    const prCanvas = useRecoilValue(previewCanvas);
    const tool = useRecoilValue(toolState);
    const [element, setElements] = useRecoilState(elements);
    const offX = useRecoilValue(offsetX);
    const offY = useRecoilValue(offsetY);
    const startMoveXRef = useRef(0);
    const startMoveYRef = useRef(0);
    const endMoveXRef = useRef(0);
    const endMoveYRef = useRef(0);
    const isMoving = useRef(false);
    const selectedShape = useRef<shape | null>(null);
    const updatedShape = useRef<shape|null>(null);
    useEffect(() => {
      if (tool !== "Pointer" || !prCanvas) return;
  
      const handleMouseDown = (e: MouseEvent) => {
        startMoveXRef.current = e.clientX + offX;
        startMoveYRef.current = e.clientY + offY;
        isMoving.current = true;
        selectedShape.current = findSelected(
          element,
          startMoveXRef.current,
          startMoveYRef.current
        );  
        if (selectedShape.current) {
          setElements(
            element.filter((el) => el.id !== selectedShape.current?.id)
          );
          drawElements([selectedShape.current], prCanvas, offX, offY);
        }
      };
  
      const handleMouseMove = (e: MouseEvent) => {
        if (!isMoving.current || !prCanvas || !selectedShape.current) return;
      
        const ctx = prCanvas.getContext("2d");
        ctx?.clearRect(0, 0, prCanvas.width, prCanvas.height);
      
        endMoveXRef.current = e.clientX + offX;
        endMoveYRef.current = e.clientY + offY;
      
        const deltaX = endMoveXRef.current - startMoveXRef.current;
        const deltaY = endMoveYRef.current - startMoveYRef.current;
      
        const updateShape = {
          ...selectedShape.current,
          properties: {
            ...(selectedShape.current.properties as Line),
            x1: (selectedShape.current.properties as Line).x1 + deltaX,
            x2: (selectedShape.current.properties as Line).x2 + deltaX,
            y1: (selectedShape.current.properties as Line).y1 + deltaY,
            y2: (selectedShape.current.properties as Line).y2 + deltaY,
          },
        };
        updatedShape.current = updateShape;
        drawElements([updateShape], prCanvas, offX, offY);
      };
      
  
      const handleMouseUp = () => {
        isMoving.current = false;
      
        if (selectedShape.current && updatedShape.current) {
          setElements([...element, updatedShape.current]); 
          selectedShape.current = null;
          updatedShape.current = null;
        }
      
        prCanvas
          .getContext("2d")
          ?.clearRect(0, 0, prCanvas.width, prCanvas.height);
      };
      
  
      prCanvas.addEventListener("mousedown", handleMouseDown);
      prCanvas.addEventListener("mousemove", handleMouseMove);
      prCanvas.addEventListener("mouseup", handleMouseUp);
  
      return () => {
        prCanvas.removeEventListener("mousedown", handleMouseDown);
        prCanvas.removeEventListener("mousemove", handleMouseMove);
        prCanvas.removeEventListener("mouseup", handleMouseUp);
      };
    }, [tool, prCanvas, element, offX, offY]);
  
    return null;
  };
  
  export { useMove };
  