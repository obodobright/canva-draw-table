import React, { useEffect, useRef } from "react";
import { Rectangle } from "../types";

interface CanvasPageProps {
    rectangles: Rectangle[]; // Accept rectangles as a prop
}

const ViewRectangleCanvasDetails: React.FC<CanvasPageProps> = ({ rectangles }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Effect to render rectangles on the canvas when the component mounts or the rectangles change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear the canvas each time we update the rectangles
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Loop through the rectangles and draw them
        rectangles.forEach((rect) => {
            const width = Math.abs(rect.width);
            const height = Math.abs(rect.height);
            const x = rect.width < 0 ? rect.x + rect.width : rect.x;
            const y = rect.height < 0 ? rect.y + rect.height : rect.y;

            ctx.fillStyle = "rgba(0, 150, 255, 0.5)"; // Blue color for rectangles
            ctx.fillRect(x, y, width, height);
        });
    }, [rectangles]);

    return (
        <div className="">
            <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="view_rectangle_canvas"
            />
        </div>
    );
};

export default ViewRectangleCanvasDetails;
