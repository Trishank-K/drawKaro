import {
  canvasRefState,
  toolState,
  offsetX,
  offsetY,
  dragStartX,
  dragStartY,
  isDragging,
} from "@/atoms/canvasAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

export default function virtualPanning() {
  const canvasRef = useRecoilValue(canvasRefState);
  const [offX, setoffX] = useRecoilState(offsetX);
  const [offY, setoffY] = useRecoilState(offsetY);
  const [dragX, setDragX] = useRecoilState(dragStartX);
  const [dragY, setDragY] = useRecoilState(dragStartY);
  const [dragging, setDragging] = useRecoilState(isDragging);

  const canvas = canvasRef;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const savedImage = localStorage.getItem("savedCanvas");
  if (savedImage && savedImage.startsWith("data:image/") && ctx) {
    const img = new Image();
    img.src = savedImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
  }

  const handleMouseDown = (e: MouseEvent) => {
    setDragging(true);
    setDragX(e.clientX - offX);
    setDragY(e.clientY - offY);
  };

  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
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
}
