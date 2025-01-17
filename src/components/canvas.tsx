import React, { useEffect, useRef, useState } from "react";
import { Rectangle } from "../types";

interface CanvasProps {
    onSave: (rectangles: Rectangle[], distance: number) => void;
}

const CanvasComponentExample: React.FC<CanvasProps> = ({ onSave }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [rectangles, setRectangles] = useState<Rectangle[]>([]);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);

    const startDrawing = (e: React.MouseEvent) => {
        if (rectangles.length >= 2) return; // Prevent more than 2 rectangles
        const rect = {
            x: e.clientX,
            y: e.clientY,
            width: 0,
            height: 0,
        };
        setCurrentRect(rect);
        setIsDrawing(true);
    };

    const drawRect = (e: React.MouseEvent) => {
        if (!isDrawing || !currentRect || rectangles.length >= 2) return;
        const rect = {
            ...currentRect,
            width: e.clientX - currentRect.x,
            height: e.clientY - currentRect.y,
        };
        setCurrentRect(rect);
    };

    const finishDrawing = () => {
        if (currentRect) {
            setRectangles((prev) => [...prev, currentRect]);
        }
        setIsDrawing(false);
        setCurrentRect(null);
    };

    const calculateDistance = () => {
        if (rectangles.length < 2) return 0;
        const [rect1, rect2] = rectangles;
        const center1 = {
            x: rect1.x + rect1.width / 2,
            y: rect1.y + rect1.height / 2,
        };
        const center2 = {
            x: rect2.x + rect2.width / 2,
            y: rect2.y + rect2.height / 2,
        };
        const distance = Math.sqrt(
            (center2.x - center1.x) ** 2 + (center2.y - center1.y) ** 2
        );
        return distance;
    };

    const handleSave = () => {
        const distance = calculateDistance();
        onSave(rectangles, distance);
        setRectangles([]); // Clear the canvas after saving
    };

    const handleClear = () => {
        setRectangles([]); // Clear the canvas
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        // Check if canvas and context are available before proceeding
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear canvas on re-render
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw rectangles
        rectangles.forEach((rect) => {
            ctx.fillStyle = "rgba(0, 150, 255, 0.5)";
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        });

        // Draw current rectangle if any
        if (currentRect) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(currentRect.x, currentRect.y, currentRect.width, currentRect.height);
        }
    }, [rectangles, currentRect]);



    return (
        <div className="view_canvas_mobile">
            <canvas
                className="canvas_layout"
                ref={canvasRef}
                width={800}
                height={600}
                onMouseDown={startDrawing}
                onMouseMove={drawRect}
                onMouseUp={finishDrawing}
            />
            <div className="canva_footer">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>

    )
}

export default CanvasComponentExample;