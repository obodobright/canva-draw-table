import React, { useEffect, useState } from "react";
import { Record } from "../types";
import EmptyTable from "./EmptyTable";

interface MeasurementTableProps {
    onRowClick: (rectangles: any[]) => void;
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
        <div className="table_wrapper_web">
            {data.length > 0 ? <table>
                <thead>
                    <tr>
                        <th>Rectangle 1 (W x H)</th>
                        <th>Rectangle 2 (W x H)</th>
                        <th>Distance</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((record) => (
                        <tr
                            key={record.id}

                        >
                            <td>{`${record.rectangles[0]?.width} x ${record.rectangles[0]?.height}`}</td>
                            <td>{`${record.rectangles[1]?.width} x ${record.rectangles[1]?.height}`}</td>
                            <td>{record.distance.toFixed(2)}</td>
                            <td>{new Date(record.createdAt).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table> : <EmptyTable />}
        </div>
    );
};

export default MeasurementTable;
