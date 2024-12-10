"use client";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  backgroundCanvas,
  previewCanvas,
  finalCanvas,
} from "@/atoms/canvasAtoms";
import Toolbar from "./toolbar";
import { useEffect, useRef, useState } from "react";
import { drawGrid } from "@/functions/drawGrid";
import { usePanning } from "@/hooks/usePanning";
import { offsetX, offsetY } from "@/atoms/canvasAtoms";

export default function Canvas() {
  const [bgCanvas, setBgCanvas] = useRecoilState(backgroundCanvas);
  const [prCanvas, setPrCanvas] = useRecoilState(previewCanvas);
  const [finCanvas, setFinCanvas] = useRecoilState(finalCanvas);

  const bgCanvasRef = useRef(null);
  const prCanvasRef = useRef(null);
  const finCanvasRef = useRef(null);

  const offX = useRecoilValue(offsetX);
  const offY = useRecoilValue(offsetY);

  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  useEffect(() => {
    setCanvasWidth(window.innerWidth);
    setCanvasHeight(window.innerHeight);
  }, []);

  useEffect(() => {
    setBgCanvas(bgCanvasRef.current);
    setPrCanvas(prCanvasRef.current);
    setFinCanvas(finCanvasRef.current);
  }, [bgCanvasRef, prCanvasRef, finCanvasRef]);

  useEffect(() => {
    drawGrid(bgCanvas, 50, offX, offY, "white");
  }, [bgCanvas, offX, offY]);

  usePanning();

  return (
    <div className="relative">
      <Toolbar />
      <canvas
        ref={bgCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="absolute z-0"
      />
      <canvas
        ref={prCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="absolute z-1"
      />
      <canvas
        ref={finCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="absolute z-2"
      />
    </div>
  );
}
