"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  canvasRefState,
  toolState,
  offsetX,
  offsetY,
  dragStartX,
  dragStartY,
  isDragging,
} from "@/atoms/canvasAtoms";
import Toolbar from "./toolbar";
import virtualPanning from "./virtualPanning";
import { useCanvas} from "@/hooks/useCanvas";
import { useLine } from "@/hooks/useLine";

export default function Canvas() {
  const [canvasRef, setCanvasRef] = useRecoilState(canvasRefState);
  const tool = useRecoilValue(toolState);
  const localRef = useRef<HTMLCanvasElement | null>(null);
  const [offX, setoffX] = useRecoilState(offsetX);
  const [offY, setoffY] = useRecoilState(offsetY);
  const [dragX, setDragX] = useRecoilState(dragStartX);
  const [dragY, setDragY] = useRecoilState(dragStartY);
  const [dragging, setDragging] = useRecoilState(isDragging);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useEffect(()=> {
    setCanvasHeight(window.innerHeight);
    setCanvasWidth(window.innerWidth);
  },[])
  useEffect(() => {
    if (localRef.current) {
      setCanvasRef(localRef.current);
    }
  }, [setCanvasRef]);

  useEffect(() => {
    const handleResize = () => {
      setCanvasHeight(window.innerHeight);
      setCanvasWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useCanvas();
  useLine();

  useEffect(() => {
    const ctx = localRef.current?.getContext("2d");
    const canvas = localRef.current
    const savedImage = localStorage.getItem("savedCanvas");
    if (savedImage && savedImage.startsWith("data:image/") && ctx) {
      const img = new Image();
      img.src = savedImage;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        ctx.drawImage(img, 0, 0);
      };
    }
    if (!ctx || tool !== "H") return;

    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    ctx.save();
    ctx.translate(-offX, -offY);

    const gridSize = 50;
    const startX = Math.floor(offX / gridSize) * gridSize;
    const startY = Math.floor(offY / gridSize) * gridSize;
    const endX = startX + canvasWidth + gridSize;
    const endY = startY + canvasHeight + gridSize;

    ctx.strokeStyle = "lightgrey";
    ctx.lineWidth = 1;

    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    ctx.restore();
  }, [offX, offY, canvasWidth, canvasHeight]);

  return (
    <div>
      <Toolbar />
      <canvas
        className=""
        ref={localRef}
        height={canvasHeight}
        width={canvasWidth}
      />
    </div>
  );
}
