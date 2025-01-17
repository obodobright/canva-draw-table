import { useEffect, useState } from "react";
import ViewRectangleCanvasDetails from "../components/viewRectangleGraps";
import { Record } from "../types";
import MobileTable from "../components/mobileTable";
import EmptyTable from "../components/EmptyTable";

const ViewRectangle: React.FC = () => {
    const [currentRectangle, setCurrentRectangle] = useState<Record | null>();
    const [currentRow, setCurrentRow] = useState<number>(0)
    const [view, setView] = useState<boolean>(false)
    const [records, setRecords] = useState<Record[]>([]);
    const [isDescending, setIsDescending] = useState<boolean>(false);

    useEffect(() => {
        const storedRecords = localStorage.getItem("measurements");
        if (storedRecords) {
            const parsedRecords = JSON.parse(storedRecords);
            setRecords(parsedRecords);
        }
    }, []);


    const deleteSingleRectangle = (id: string) => {
        console.log(id, "the id")
        const filterRecords = records.filter((record) => record.id !== id);
        setRecords(filterRecords);
        localStorage.setItem("measurements", JSON.stringify(filterRecords))
        setCurrentRectangle(null)
    }


    const sortRecordsIndependently = () => {
        const sortedRecords = [...records].sort((a: any, b: any) =>
            isDescending ? b.distance - a.distance : a.distance - b.distance
        );

        setRecords(sortedRecords);
        setIsDescending(!isDescending);
    };


    return (
        <section className="rectangle_container">
            <section className="rectangle_view_top_wrapper">
                <div className="header_text">
                    <h3 className="header_text">View Rectangle</h3>
                    <p>View, sort and display rectangles</p>
                </div>
                <div className="rectangle_right_btn">
                    <button className={`${isDescending ? "btn_isSorted" : ""}`} onClick={sortRecordsIndependently}>Sort by distance</button>
                </div>
            </section>
            <div className="view_rectangle_table">
                {records.length > 0 ? <>

                    <div className="table_wrapper">
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
                                {records.map((record, index) => (
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
                    </div>
                    <div className="table_wrapper_mobile_container">
                        {records.map((record) => (
                            <MobileTable key={record.id} setCurrentRectangle={setCurrentRectangle} deleteSingleRec={deleteSingleRectangle} setView={setView} records={record} />
                        ))}

                    </div>
                </> : <EmptyTable />}
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