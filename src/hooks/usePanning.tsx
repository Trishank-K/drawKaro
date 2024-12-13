import {
  dragStartX,
  dragStartY,
  isDragging,
  offsetX,
  offsetY,
  previewCanvas,
  toolState,
} from "@/atoms/canvasAtoms";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const usePanning = () => {
  const prCanvas = useRecoilValue(previewCanvas);
  const [startDragX, setStartDragX] = useRecoilState(dragStartX);
  const [startDragY, setStartDragY] = useRecoilState(dragStartY);
  const [dragging, setDragging] = useRecoilState(isDragging);
  const [offX, setOffX] = useRecoilState(offsetX);
  const [offY, setOffY] = useRecoilState(offsetY);
  const selectedTool = useRecoilValue(toolState);

  useEffect(() => {
    if (!prCanvas || selectedTool !== "H") return;
    const handleMouseDown = (e: MouseEvent) => {
      setDragging(true);
      setStartDragX(offX + e.clientX);
      setStartDragY(offY + e.clientY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newOffsetX = startDragX - e.clientX;
        const newOffsetY = startDragY - e.clientY;
        setOffX(newOffsetX);
        setOffY(newOffsetY);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    prCanvas.addEventListener("mousedown", handleMouseDown);
    prCanvas.addEventListener("mousemove", handleMouseMove);
    prCanvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      prCanvas.removeEventListener("mousedown", handleMouseDown);
      prCanvas.removeEventListener("mousemove", handleMouseMove);
      prCanvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    prCanvas,
    dragging,
    offX,
    offY,
    startDragX,
    startDragY,
    setDragging,
    setStartDragX,
    setStartDragY,
    setOffX,
    setOffY,
    selectedTool,
  ]);
};

export { usePanning };
