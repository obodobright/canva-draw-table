import React, { useEffect, useState } from "react";
import { Record } from "../types";


interface MeasurementTableProps {
    records: Record[];
    onRowClick: (record: Record) => void;
    selectedRecordId: string | null;
}

const MeasurementTable: React.FC<MeasurementTableProps> = ({ onRowClick }) => {
    const [records, setRecords] = useState<Record[]>([]);

    useEffect(() => {
        const savedRecords = localStorage.getItem("measurements");
        if (savedRecords) {
            setRecords(JSON.parse(savedRecords));
        }
    }, []);
    const savedRecords = localStorage.getItem("measurements");
    const data: Record[] = savedRecords ? JSON.parse(savedRecords) : []


    return (
        <table>
            <thead>
                <tr>
                    <th>Rectangle 1 (W x H)</th>
                    <th>Rectangle 2 (W x H)</th>
                    <th>Distance</th>
                    <th>Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((record) => (
                    <tr
                        key={record.id}
                        onClick={() => onRowClick(record.rectangles)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{`${record.rectangles[0].width} x ${record.rectangles[0].height}`}</td>
                        <td>{`${record.rectangles[1].width} x ${record.rectangles[1].height}`}</td>
                        <td>{record.distance.toFixed(2)}</td>
                        <td>{new Date(record.createdAt).toLocaleString()}</td>
                        <td><button>Trash</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MeasurementTable;
