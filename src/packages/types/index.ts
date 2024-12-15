import { Point } from "roughjs/bin/geometry";

interface Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    options?: {
        strokeWidth?: number;
        stroke?: string;
    };
}

interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    options?: {
        strokeWidth?: number;
        stroke?: string;
        fill?: string
    };
}

interface FreeStyle {
    points: Point[] | Point[][];
    options?: {
        strokeWidth?: number;
        stroke?: string
    }
}

interface shape {
    name: "Line" | "Rectangle" | "FreeStyle",
    properties: Line | Rectangle | FreeStyle
}

export type {Line, Rectangle, FreeStyle, shape}