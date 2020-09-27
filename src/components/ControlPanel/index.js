import React from "react";

import RecordStoreList from "../RecordStoreList";

import "./styles.css";

export default function ControlPanel() {
  return (
    <>
      <div className="control-panel">
        <h2>Más de 100 tiendas</h2>
        <h1>Tiendas de discos en Barcelona</h1>
        <RecordStoreList />
      </div>
    </>
  );
}
