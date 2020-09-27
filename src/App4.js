import React from "react";

import Header from "./components/Header";
import "./App3.css";
import ControlPanel from "./components/ControlPanel";
import MapComponent from "./components/MapComponent";

const App = () => {
  return (
    <div className="app">
      <Header />
      <span className="info-container">
        <ControlPanel />
        <MapComponent />
      </span>
    </div>
  );
};

export default App;
