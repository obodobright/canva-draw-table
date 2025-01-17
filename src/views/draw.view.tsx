import { useState } from "react";
import CanvasComponentExample from "../components/canvas.example"
import MeasurementTable from "../components/MeasurementTable"
import { Record, Rectangle } from "../types";

const DrawViews: React.FC = () => {
    const [savedRecords, setSavedRecords] = useState<Record[]>([]);

    const handleSave = (rectangles: Rectangle[], distance: number) => {
        const newRecord: Record = {
            id: Date.now().toString(),
            rectangles,
            distance,
            createdAt: new Date().toISOString(),
        };
        const updatedRecords = [...savedRecords, newRecord];
        setSavedRecords(updatedRecords);
        localStorage.setItem("measurements", JSON.stringify(updatedRecords));
    };

    const handleRowClick = (rectangles: Rectangle[]) => {
        setSavedRecords([]);

    };
    return (
        <div className='layout'>
            <div className='canvas_containe'>
                <h3>Draw and Design</h3>
                <CanvasComponentExample onSave={handleSave} />
            </div>
            <div className='table_container'>
                <h3>View all Rectangles (10)</h3>
                <MeasurementTable onRowClick={handleRowClick} />
            </div>
        </div>
    )
}

export default DrawViews