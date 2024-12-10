import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  canvasRefState,
  offsetX,
  offsetY,
  dragStartX,
  dragStartY,
  isDragging,
  toolState,
  dragEndX,
  dragEndY,
} from "@/atoms/canvasAtoms";

export function useCanvas() {
  const canvasRef = useRecoilValue(canvasRefState);
  const [offX, setoffX] = useRecoilState(offsetX);
  const [offY, setoffY] = useRecoilState(offsetY);
  const [dragX, setDragX] = useRecoilState(dragStartX);
  const [dragY, setDragY] = useRecoilState(dragStartY);
  const [endX, setEndX] = useRecoilState(dragEndX);
  const [endY, setEndY] = useRecoilState(dragEndY);
  const [dragging, setDragging] = useRecoilState(isDragging);
  const tool = useRecoilValue(toolState)
  useEffect(() => {
    const canvas = canvasRef;
    if (!canvas) return;

    const handleMouseDown = (e: MouseEvent) => {
      setDragging(true);
      setDragX(e.clientX - offX);
      setDragY(e.clientY - offY);
    };

    const handleMouseUp = (e:MouseEvent) => {setDragging(false);
      setEndX(e.clientX - offX);
      setEndY(e.clientY - offY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging && tool == "H") {
        setoffX(dragX - e.clientX);
        setoffY(dragY - e.clientY);
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    canvasRef,
    offX,
    offY,
    dragX,
    dragY,
    dragging,
    setDragging,
    setDragX,
    setDragY,
    setoffX,
    setoffY,
  ]);
}
