import React, { useState } from 'react';
import './App.css';

import HeaderComponent from './components/header';

import DrawViews from './views/draw.view';
import ViewRectangle from './views/view_rectangle.views';

function App() {
  const [viewPage, setViewPage] = useState<string>("draw");



  return (
    <div className="">
      <HeaderComponent setViewPage={setViewPage} />
      {viewPage === "draw" ? <DrawViews /> : <>
        <ViewRectangle />
      </>}

    </div>
  );
}

export default App;
