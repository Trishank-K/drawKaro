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

interface shape {
    name: "Line" | "Rectangle",
    properties: Line | Rectangle
}

export type {Line, Rectangle, shape}