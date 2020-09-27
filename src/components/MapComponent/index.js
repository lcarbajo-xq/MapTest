import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
// import * as data from "./record-stores.json";

import { useHoverEffect } from "../../hooks/useHooverEffect";

import "./styles.css";

const token =
  "pk.eyJ1IjoibGNhcmJham8iLCJhIjoiY2tkNjl4bDFiMDkxYTJybjU1NzQzenl2NiJ9.SXYTOsxMD7gORIM-mmVwGw";

const style = "mapbox://styles/lcarbajo/ckd6b1ssz1ezd1inzypezuff9";

const hoverPopUp = (
  <Popup
    closeButton={false}
    closeOnClick={false}
    longitude={0.0}
    latitude={0.0}
  >
    {" "}
  </Popup>
);

const dataLayerFill = {
  id: "state-fills",
  type: "fill",
  source: "states",
  paint: {
    "fill-color": "#f28482",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0,
    ],
  },
};

const dataLayerBorder = {
  id: "state-borders",
  type: "line",
  source: "states",
  paint: {
    "line-color": "#f28482",
    "line-width": 2,
  },
};

export default function MapComponent() {
  const [viewport, setViewport] = useState({
    width: "60vw",
    height: "100vh",
    latitude: 38.7071,
    longitude: -9.13549,
    zoom: 5,
  });

  const mapRef = useRef();

  const {
    setHover,
    selectedStore,
    setSelectedStore,
    unsetHover,
  } = useHoverEffect(mapRef);

  // useEffect(() => {
  //   const listener = (e) => {
  //     if (e.key === "Escape") {
  //       setSelectedStore(null);
  //     }
  //   };
  //   window.addEventListener("keydown", listener);
  // }, []);

  return (
    <>
      <div className="map-container">
        <ReactMapGL
          {...viewport}
          style={{ top: 0, right: 0, border: "1px solid blue" }}
          ref={mapRef}
          mapboxApiAccessToken={token}
          // mapStyle={style}
          onViewportChange={setViewport}
          onHover={(e) => setHover(e)}
          onMouseOut={(e) => unsetHover(e)}
        >
          {selectedStore && selectedStore.ADMIN !== undefined && (
            <Popup
              latitude={selectedStore.pointLat}
              longitude={selectedStore.pointLong}
              onClose={() => {
                setSelectedStore(null);
              }}
            >
              <div>
                <p>{selectedStore.ADMIN && selectedStore.ADMIN}</p>
              </div>
            </Popup>
          )}
          <Source
            id="states"
            generateId
            type="geojson"
            data="/countries.geojson"
          >
            <Layer {...dataLayerFill} />
            <Layer {...dataLayerBorder} />
          </Source>
          {/* {/* { 
          data.default.map( (recordStore) => (
          
            <Marker key= { recordStore.recordid } latitude= { recordStore.fields.geoloc[0] } longitude= { recordStore.fields.geoloc[1] }>
              <button className='marker-btn' onClick = { (e) => {
                e.preventDefault();
                setSelectedStore(recordStore)
              }}>
                <img src='/record-store.png' alt='record-store-icon'/>
              </button>
            </Marker>
          ))} */}
        </ReactMapGL>
      </div>
    </>
  );
}
