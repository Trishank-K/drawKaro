import { shape } from "@/packages/types";
import { atom } from "recoil";

const backgroundCanvas = atom<HTMLCanvasElement | null>({
  key: "bgcanvas",
  default: null,
});
const previewCanvas = atom<HTMLCanvasElement | null>({
  key: "prcanvas",
  default: null,
});
const finalCanvas = atom<HTMLCanvasElement | null>({
  key: "fincanvas",
  default: null,
});
const elements = atom<shape[]>({
  key: "elements",
  default: []
})
const toolState = atom<number | string>({
  key: "tools",
  default: "H",
});
const offsetX = atom<number>({
  key: "offsetX",
  default: 0,
});
const offsetY = atom<number>({
  key: "offsetY",
  default: 0,
});
const dragStartX = atom<number>({
  key: "dragStartX",
  default: 0,
});
const dragStartY = atom<number>({
  key: "dragStartY",
  default: 0,
});
const isDragging = atom<boolean>({
  key: "isDragging",
  default: false,
});
const dragEndX = atom<number>({
  key: "dragEndx",
  default: 0,
});
const dragEndY = atom<number>({
  key: "dragEndY",
  default: 0,
});

export {
  backgroundCanvas,
  previewCanvas,
  finalCanvas,
  elements,
  toolState,
  offsetX,
  offsetY,
  dragStartX,
  dragStartY,
  isDragging,
  dragEndX,
  dragEndY,
};
