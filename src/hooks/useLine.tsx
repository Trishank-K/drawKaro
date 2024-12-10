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

export function useLine() {
  const canvasRef = useRecoilValue(canvasRefState);
  const endX = useRecoilValue(dragEndX);
  const endY = useRecoilValue(dragEndY);
  const [dragX] = useRecoilState(dragStartX);
  const [dragY] = useRecoilState(dragStartY);
  const [dragging] = useRecoilState(isDragging);
  const toolbarState = useRecoilValue(toolState);

  useEffect(() => {
      if (!canvasRef || toolbarState !== 7) return;
    
      const ctx = canvasRef.getContext("2d");
      if (!ctx) return;
    
      if (dragging) {
        // Clear the canvas and redraw for live preview
        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
    
        // Optionally re-draw any previously completed lines here
    
        // Draw the live preview line
        ctx.beginPath();
        ctx.moveTo(dragX, dragY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "white";
        ctx.stroke();
      } else {
        // Finalize the line on mouseUp
        ctx.beginPath();
        ctx.moveTo(dragX, dragY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "white";
        ctx.stroke();
      }
    }, [canvasRef, toolbarState, dragging, dragX, dragY, endX, endY]);
}
