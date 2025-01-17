import React from "react";
import { Record } from "../types";

interface MobileProps {
    records: Record;
    deleteSingleRec: (id: string) => void;
    setView: (view: boolean) => void;
    setCurrentRectangle: (record: Record) => void
}


const MobileTable: React.FC<MobileProps> = ({ records, deleteSingleRec, setView, setCurrentRectangle }) => {
    return (
        <section className="table_wrapper_mobile">
            <div className="table_rec_size">
                <div>
                    <p>Rectangle 1 </p>
                    <h4>{`${records.rectangles[0]?.width} x ${records.rectangles[0]?.height}`}</h4>
                </div>
                <div>
                    <p>Rectangle 2 </p>
                    <h4>{`${records.rectangles[1]?.width} x ${records.rectangles[1]?.height}`}</h4>
                </div>
            </div>
            <div className="table_rec_size">
                <div>
                    <p>Distance </p>
                    <h4>{records.distance.toFixed(2)}</h4>
                </div>
                <div>
                    <p>Date </p>
                    <h4>{new Date(records.createdAt).toLocaleString()}</h4>
                </div>
            </div>

            <div>
                <button onClick={() => {
                    setCurrentRectangle(records);

                    setView(true);
                }} className="btn solid_btn">View</button>
                <button

                    onClick={() => {
                        deleteSingleRec(records.id)
                        setView(false)
                    }}
                    className="btn danger_btn">Delete</button>
            </div>
        </section>
    )
}

export default MobileTable;