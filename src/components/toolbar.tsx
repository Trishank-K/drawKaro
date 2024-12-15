import { items } from "@/lib/navbarItems";
import { toolState } from "@/atoms/canvasAtoms";
import { useRecoilState } from "recoil";
export default function Toolbar() {
  const [tool, setTool] = useRecoilState(toolState);
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 gap-4 flex h-fit w-fit items-center justify-center z-10 rounded-2xl bg-slate-800 p-2 pointer-events-auto">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setTool(item.figure);
          }}
          className={`relative flex items-center justify-center ${
            tool === item.figure ? "bg-slate-950" : "hover:bg-slate-700"
          } rounded-2xl p-2`}
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="absolute bottom-0 right-0 text-xs bg-slate-900 text-white px-1 rounded-full">
            {item.button}
          </div>
        </div>
      ))}
    </div>
  );
}
