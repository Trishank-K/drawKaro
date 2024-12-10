import { LuRectangleHorizontal } from "react-icons/lu";
import { LuDiamond } from "react-icons/lu";
import { FaRegHandPaper } from "react-icons/fa";
import { GoDash } from "react-icons/go";
import { FiMousePointer } from "react-icons/fi";
interface itemsType {
  button: number|string;
  figure: string;
  icon: JSX.Element;
}

const items: itemsType[] = [
  {
    button: "H",
    figure: "hand",
    icon: <FaRegHandPaper />,
  },
  {
    button: 1,
    figure: "pointer",
    icon: <FiMousePointer />,
  },
  {
    button: 2,
    figure: "rectangle",
    icon: <LuRectangleHorizontal />,
  },
  {
    button: 3,
    figure: "diamond",
    icon: <LuDiamond />,
  },
  {
    button: 7,
    figure: "line",
    icon: <GoDash />,
  },
];

export { items };
