import { useRef, useState } from "react";
import { Rectangle } from "../types";

interface CanvasProp {
    onSave: (rectangles: Rectangle, distance: number) => void
}

const CanvasExample: React.FC<CanvasProp> = ({ onSave }) => {
    const CanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [rectangles, setRectangles] = useState<Rectangle[]>([]);
    const [isDrawing, setIsDrawing] = useState<Boolean>(false);
    const [currentRect, setCurrentRect] = useState<Rectangle | null>(null)

    const toDraw = (e: React.MouseEvent) => {
        if (rectangles.length > 2) return;

        const rect = {
            x: e.clientX,
            y: e.clientY,
            width: 0,
            height: 0
        }
        setCurrentRect(rect);
        setIsDrawing(true)
    }

    const drawingRect = (e: React.MouseEvent) => {
        if (!isDrawing || !currentRect || rectangles.length >= 2) return

        const rect = {
            ...currentRect,
            width: e.clientX - currentRect.x,
            height: e.clientY - currentRect.y
        }
        setCurrentRect(rect)
    }
    return (
        <section>Canvas</section>
    )
}

export default CanvasExample;