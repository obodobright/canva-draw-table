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

    const getEventCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        if (e.type.startsWith("touch")) {
            const touchEvent = e as React.TouchEvent;
            return {
                clientX: touchEvent.touches[0].clientX,
                clientY: touchEvent.touches[0].clientY,
            };
        } else {
            const mouseEvent = e as React.MouseEvent;
            return {
                clientX: mouseEvent.clientX,
                clientY: mouseEvent.clientY,
            };
        }
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (rectangles.length >= 2) return; // Prevent more than 2 rectangles

        const { clientX, clientY } = getEventCoordinates(e)

        const rect = {
            x: clientX,
            y: clientY,
            width: 0,
            height: 0,
        };
        setCurrentRect(rect);
        setIsDrawing(true);
    };

    const drawRect = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !currentRect || rectangles.length >= 2) return;

        const { clientX, clientY } = getEventCoordinates(e)

        const rect = {
            ...currentRect,
            width: clientX - currentRect.x,
            height: clientY - currentRect.y,
        };
        setCurrentRect(rect);
    };

    const finishDrawing = () => {


        if (!currentRect || rectangles.length >= 2) return;
        let { x, y, width, height } = currentRect;


        if (Math.abs(width) < 5 || Math.abs(height) < 5) {
            setCurrentRect(null);
            setIsDrawing(false);
            return;
        }


        if (width < 0) {
            x += width;
            width = Math.abs(width);
        }
        if (height < 0) {
            y += height;
            height = Math.abs(height);
        }

        const rect = { x, y, width, height };
        setRectangles((prev) => [...prev, rect]);
        setCurrentRect(null);
        setIsDrawing(false);

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

        if (rectangles.length < 2) {
            alert("You must draw two rectangles before saving!");
            return;
        }

        const distance = calculateDistance();
        onSave(rectangles, distance);
        setRectangles([]); // Clear the canvas after saving


    };

    const handleClear = () => {
        setRectangles([]); // Clear the canvas
        setCurrentRect(null) // prevent half drawn rectangles when the canva is cleared while drawing.
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
                className="canvas_layout bg-red-50"
                ref={canvasRef}
                width={800}
                height={800}
                onMouseDown={startDrawing}
                onMouseMove={drawRect}
                onMouseUp={finishDrawing}
                onTouchStart={startDrawing}
                onTouchMove={drawRect}
            />
            <div className="canva_footer">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>

    )
}

export default CanvasComponentExample;