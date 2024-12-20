"use client";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import { useDraw } from "@/hooks/useDraw";
import { useMove } from "@/hooks/useMove";

export default function Canvas() {
  const [bgCanvas, setBgCanvas] = useRecoilState(backgroundCanvas);
  const [prCanvas, setPrCanvas] = useRecoilState(previewCanvas);
  const setFinCanvas = useSetRecoilState(finalCanvas);
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
    drawGrid(bgCanvas, 100, offX, offY, "white");
  }, [bgCanvas, prCanvas, offX, offY]);
  
  useDraw();
  usePanning();
  useMove();

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
        ref={finCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="absolute z-1"
      />
      <canvas
        ref={prCanvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="absolute z-2 pointer-events-auto"
      />
    </div>
  );
}
