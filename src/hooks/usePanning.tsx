import {
    backgroundCanvas,
    dragStartX,
    dragStartY,
    isDragging,
    offsetX,
    offsetY,
  } from "@/atoms/canvasAtoms";
  import { useEffect } from "react";
  import { useRecoilState, useRecoilValue } from "recoil";
  
  const usePanning = () => {
    const bgCanvas = useRecoilValue(backgroundCanvas);
    const [startDragX, setStartDragX] = useRecoilState(dragStartX);
    const [startDragY, setStartDragY] = useRecoilState(dragStartY);
    const [dragging, setDragging] = useRecoilState(isDragging);
    const [offX, setOffX] = useRecoilState(offsetX);
    const [offY, setOffY] = useRecoilState(offsetY);
  
    useEffect(() => {
      if (!bgCanvas) return;
  
      const handleMouseDown = (e: MouseEvent) => {
        setDragging(true);
        setStartDragX(e.clientX - offX);
        setStartDragY(e.clientY - offY);
      };
  
      const handleMouseMove = (e: MouseEvent) => {
        if (dragging) {
          setOffX(e.clientX - startDragX);
          setOffY(e.clientY - startDragY);
        }
      };
  
      const handleMouseUp = () => {
        setDragging(false);
      };
  
      bgCanvas.addEventListener("mousedown", handleMouseDown);
      bgCanvas.addEventListener("mousemove", handleMouseMove);
      bgCanvas.addEventListener("mouseup", handleMouseUp);
  
      return () => {
        bgCanvas.removeEventListener("mousedown", handleMouseDown);
        bgCanvas.removeEventListener("mousemove", handleMouseMove);
        bgCanvas.removeEventListener("mouseup", handleMouseUp);
      };
    }, [bgCanvas, dragging, offX, offY, startDragX, startDragY, setDragging, setStartDragX, setStartDragY, setOffX, setOffY]);
  };
  
  export { usePanning };
  