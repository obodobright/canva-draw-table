import { useState } from "react";
import ViewRectangleCanvasDetails from "../components/viewRectangleGraps";
import { Record, Rectangle } from "../types";

const ViewRectangle: React.FC = () => {
    const [currentRectangle, setCurrentRectangle] = useState<Record | null>();
    const [currentRow, setCurrentRow] = useState<number>(0)
    const [view, setView] = useState<boolean>(false)
    const savedRecords = localStorage.getItem("measurements");
    const data: Record[] = savedRecords ? JSON.parse(savedRecords) : []
    console.log(data, "the data")

    const deleteSingleRectangle = (id: string) => {
        const records = data.filter((record) => record.id !== id);
        localStorage.setItem("measurements", JSON.stringify(records))
        setCurrentRectangle(null)

    }

    console.log(view, "the current")

    return (
        <section className="rectangle_container">
            <div className="header_text">
                <h3 className="header_text">View Rectangle</h3>
                <p>View, sort and display rectangles</p>
            </div>
            <div className="view_rectangle_table">
                <table className="view_rectangle_table">
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
                        {data.map((record, index) => (
                            <tr

                                key={record.id}

                                className={view && currentRow === index ? "table_view_rectangle_active" : "table_view_rectangle"}
                            >
                                <td>{`${record.rectangles[0]?.width} x ${record.rectangles[0]?.height}`}</td>
                                <td>{`${record.rectangles[1]?.width} x ${record.rectangles[1]?.height}`}</td>
                                <td>{record.distance.toFixed(2)}</td>
                                <td>{new Date(record.createdAt).toLocaleString()}</td>
                                <td>
                                    <div>
                                        <button onClick={() => {
                                            deleteSingleRectangle(record.id)
                                            setView(false)
                                        }}>Delete</button>  <button onClick={() => {
                                            setCurrentRectangle(record);
                                            setCurrentRow(index)
                                            setView(true);
                                        }}>View</button>
                                    </div>
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
                <div className="view_canvas_container">

                    {view && (
                        <>
                            <ViewRectangleCanvasDetails rectangles={currentRectangle?.rectangles || []} />
                            <div className="canvas_view_details">
                                <p>Distance : <span>{currentRectangle?.distance}</span></p>
                                <p>Date Created: <span>{currentRectangle?.createdAt}</span></p>
                            </div>
                        </>
                    )}

                </div>
            </div>

        </section>
    )
}

export default ViewRectangle;