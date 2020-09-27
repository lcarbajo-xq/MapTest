import React from "react";

import "./styles.css";

export default function RecordStore() {
  return (
    <>
      <span>
        <div className="store-list-element">
          <img src="/logo512.png" alt="IMAGEN" />
          <div className="store-info-container">
            <p>Tags de tienda</p>
            <h3>Nombre de la tienda</h3>
            <h4>Caracteristicas de la tienda</h4>
          </div>
        </div>
      </span>
    </>
  );
}
