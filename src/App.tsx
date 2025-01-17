import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import MeasurementTable from './components/MeasurementTable';
import CanvasComponent from './components/Canvas';
import { Record, Rectangle } from './types';
import HeaderComponent from './components/header';

function App() {

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
    // Re-render the saved rectangles on canvas
    // You can also pass the rectangles back to the Canvas component if needed
  };
  return (
    <div className="">
      <HeaderComponent />
      <div style={{ display: "fle" }} className='layout'>
        <div className='canvas_container'>
          <h3>Draw and Design</h3>
          <CanvasComponent onSave={handleSave} />
        </div>
        <div className='table_container'>
          <h3>View all Rectangles (10)</h3>
          <MeasurementTable onRowClick={handleRowClick} />
        </div>
      </div>
    </div>
  );
}

export default App;
