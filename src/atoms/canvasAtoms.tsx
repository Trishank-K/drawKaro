import { atom } from "recoil";

const canvasRefState = atom<HTMLCanvasElement | null>({
  key: "canvas",
  default: null,
});
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
  key:"dragEndx",
  default: 0
})
const dragEndY = atom<number>({
  key:"dragEndY",
  default: 0
})

export { canvasRefState, toolState, offsetX, offsetY, dragStartX, dragStartY, isDragging, dragEndX, dragEndY };
